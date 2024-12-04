"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogType,
  useDialog,
} from "@/src/app/components/ui/dialog";
import { useAccount, useSwitchChain } from "wagmi";
import useIsChainSupported from "@/src/app/hooks/useIsChainSupported";
import { useToast } from "@/src/app/hooks/use-toast";
import { ChainIcons, ChainNames } from "@/src/app/utils/constants";
import Spinner from "@/src/app/components/ui/spinner";
import { cn } from "../../lib/utils";

type ChainType = 1 | 11155111 | 56 | 8453 | 97;

const SwitchChainDialog = () => {
  const { open, setOpen } = useDialog(DialogType.SwitchChain);
  const { chains, isPending, switchChain } = useSwitchChain();
  const { chainId } = useAccount();
  const [pendingChainId, setPendingChainId] = useState<number>();
  const { isCurrentChainSupported } = useIsChainSupported();
  const { toast } = useToast();

  const handleSwitchChain = (chainIdToSwitch: ChainType) => {
    try {
      if (chainId !== chainIdToSwitch) {
        setPendingChainId(chainIdToSwitch);
        switchChain({ chainId: chainIdToSwitch });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error.message,
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-2xl text-gray-900">
            Switch Networks
          </DialogTitle>
          {!isCurrentChainSupported && (
            <DialogDescription className="!text-base text-gray-600">
              Wrong network detected, switch to continue.
            </DialogDescription>
          )}
        </DialogHeader>
        <div>
          {chains.map((chain) => {
            const ChainIcon = ChainIcons[chain.id] || ChainIcons[1]; // fallback to Ethereum icon

            return (
              <div
                key={chain.id}
                onClick={() => handleSwitchChain(chain.id as ChainType)}
                className={cn(
                  "flex justify-between items-center cursor-pointer border rounded-lg my-2 p-3 ",
                  chain.id === chainId ? "bg-green-primary" : "hover:bg-gray-50"
                )}
              >
                <div className="flex space-x-3 items-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <ChainIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">
                      {ChainNames[chain.id] || chain.name}
                    </p>
                    {chain.id === chainId && (
                      <p className="text-sm text-clay-secondary">Connected</p>
                    )}
                  </div>
                </div>
                <div className="text-gray-600">
                  {isPending && chain.id === pendingChainId ? (
                    <Spinner className="text-gray-600" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchChainDialog;
