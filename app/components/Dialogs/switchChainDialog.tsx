import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogType,
  useDialog,
} from "@/components/ui/dialog";
import { useAccount, useSwitchChain } from "wagmi";
import Image from "next/image";
import useIsChainSupported from "@/hooks/useIsChainSupported";
import { useToast } from "@/hooks/use-toast";

type ChainType = 8453;

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
          <DialogTitle className="!text-4xl">Switch Networks</DialogTitle>
          {!isCurrentChainSupported && (
            <DialogDescription className="!text-2xl">
              Wrong network detected, switch to continue.
            </DialogDescription>
          )}
        </DialogHeader>
        <div>
          {chains.map((chain) => (
            <div
              key={chain.id}
              onClick={() => handleSwitchChain(chain.id as ChainType)}
              className="flex justify-between items-center cursor-pointer border my-2 p-2"
            >
              <div className="flex space-x-2 items-center">
                <Image
                  src={`/chainWalletIcon/${chain.name.toLowerCase()}.svg`}
                  alt={`${chain.name}`}
                  width={30}
                  height={30}
                />
                <p>{chain.name}</p>
              </div>
              <div className="text-white">
                {isPending && chain.id === pendingChainId ? (
                  <p>Loading...</p>
                ) : chainId === chain.id ? (
                  <p>Connected</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchChainDialog;
