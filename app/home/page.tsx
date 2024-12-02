"use client";

import { BarChart3, Send, FileText, Link2, RefreshCw } from "lucide-react";
import Image from "next/image";
import SwitchChainDialog from "../components/Dialogs/switchChainDialog";
import ConnectorDialog from "../components/Dialogs/connector";
import Navbar from "../components/Header/Navbar";
import { PendingTransactions } from "./_components/PendingTransactions";
import { TransactionsTab } from "./_components/TransactionsTab";

export default function page() {
  return (
    <div className="min-h-screen  bg-clay-primary">
      {/* Main Layout Grid */}
      <div className="grid grid-cols-[80px_1fr] min-h-screen">
        {/* Sidebar */}
        <aside className="bg-[#5710b2] p-4 flex flex-col items-center gap-8">
          <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Logo"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <nav className="flex flex-col gap-6">
            <button className="p-3 rounded-lg bg-white/10 text-white">
              <BarChart3 className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-lg hover:bg-white/10 text-white/60">
              <Send className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-lg hover:bg-white/10 text-white/60">
              <FileText className="w-6 h-6" />
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className=" p-6 w-full max-w-screen-2xl mx-auto">
          {/* Header */}
          <>
            <header className="flex justify-end mb-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-black rounded-full" />
                <div className="w-10 h-10 bg-black rounded-full" />
                <div className="w-10 h-10 bg-black rounded-full" />
                <Navbar />
              </div>
            </header>
          </>
          <div className="grid md:grid-cols-6 gap-10 my-10">
            <div className="md:col-span-2 bg-white p-10 rounded-xl">
              {/* Content Grid */}
              <div className="grid gap-6">
                {/* Balance Card */}
                <div className="bg-green-light rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#7e8299] mb-1">Balance</p>
                      <h2 className="text-2xl font-bold text-[#152c5b] mb-2">
                        ETH
                      </h2>
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
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Send className="w-5 h-5" />, title: "Send ETH" },
                    {
                      icon: <FileText className="w-5 h-5" />,
                      title: "Transfer Token",
                    },
                    {
                      icon: <FileText className="w-5 h-5" />,
                      title: "Import Token",
                    },
                    {
                      icon: <Link2 className="w-5 h-5" />,
                      title: "Connect to dApp",
                    },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className="flex items-start flex-col gap-3 p-5 bg-[#f5f8fa] rounded-xl hover:bg-green-light border-2 border-transparent border-dashed hover:border-green-primary transition-all ease-in duration-150"
                    >
                      <span className="text-[#3f4254]">{action.icon}</span>
                      <span className="text-[#3f4254] font-medium">
                        {action.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-4  bg-white h-full w-full rounded-xl p-5">
              <PendingTransactions />{" "}
            </div>
          </div>
          <div className="grid md:grid-cols-6 gap-10 ">
            <div className="md:col-span-2 flex flex-col gap-10 ">
              {/* Price Section */}
              <div className=" bg-white rounded-xl p-10">
                <h3 className="text-[#7e8299] mb-2">Ether Price</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#20d489]">
                    $3666.32
                  </span>
                  <span className="text-[#a1a5b7]">@ 0.037804 BTC</span>
                </div>
                <p className="text-sm text-[#a1a5b7] mt-2">
                  As of Monday, December 2, 2024 at 08:54:28 PM
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-[#7e8299]">
                    Source: coingecko.com
                  </span>
                  <button className="px-3 py-1 bg-[#20d489] text-white rounded-full text-sm">
                    Refresh
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className=" bg-white rounded-xl p-10">
                <h3 className="text-[#7e8299] mb-4">Ethereum Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#7e8299]">Gas Price</span>
                      <span className="text-[#3f4254]">31.806494879 Gwei</span>
                    </div>
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
              </div>
            </div>
            <div className="md:col-span-4 bg-white rounded-xl ">
              <TransactionsTab />
            </div>
          </div>
        </main>
      </div>
      <SwitchChainDialog />
      <ConnectorDialog />
    </div>
  );
}
