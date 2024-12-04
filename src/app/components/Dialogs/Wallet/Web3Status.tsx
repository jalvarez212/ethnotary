"use client";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { DialogType, useDialog } from "@/src/app/components/ui/dialog";
import { Wallet, Check, Copy, LogOut, SwitchCamera } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCopyToClipboard } from "@/src/app/hooks/useCopyToClipboard";
import { shortenAddress } from "@/src/app/lib/utils";

export const Web3Status = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { setOpen: setOpenSwitchChain } = useDialog(DialogType.SwitchChain);
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleSwitchNetwork = () => {
    setDropdownOpen(false); // Close dropdown
    setOpenSwitchChain(true); // Open switch chain modal
  };

  const handleDisconnect = () => {
    setDropdownOpen(false);
    disconnect();
  };

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    copyToClipboard(address!);
  };

  return (
    <div className="flex items-center justify-center">
      {!isConnected && (
        <Wallet
          className="w-6 h-6 text-clay-secondary"
          onClick={() => setOpenConnector(true)}
        />
      )}
      {isConnected && address && (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger>
            <Wallet className="w-6 h-6 text-green-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col w-80 items-center p-4 bg-gray-800 rounded-xl text-white">
            <div className="flex flex-col items-center mb-4">
              <Image
                src="/logo/logo.png"
                width={50}
                height={50}
                alt="Profile"
                className="rounded-full mb-2"
              />
              <div className="text-center flex-col flex space-y-1">
                <span>{shortenAddress(address)}</span>
                <span className="text-sm text-gray-400">0 ETH</span>
              </div>
            </div>
            <div className="flex justify-between w-full gap-2">
              <DropdownMenuItem
                onClick={handleCopyAddress}
                className="flex items-center flex-col justify-center bg-gray-700 rounded-lg cursor-pointer w-full"
              >
                {isCopied ? (
                  <Check className="w-4 h-4  text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 " />
                )}
                <span>Copy Address</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDisconnect}
                className="flex items-center flex-col justify-center bg-gray-700 rounded-lg cursor-pointer w-full"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuItem
              onClick={handleSwitchNetwork}
              className="flex items-center flex-col justify-center bg-gray-700 rounded-lg cursor-pointer w-full mt-2"
            >
              <SwitchCamera className="w-4 h-4" />
              <span>Switch Network</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
