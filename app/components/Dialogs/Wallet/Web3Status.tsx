import React, { FC } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import useIsChainSupported from "@/hooks/useIsChainSupported";
import { DialogType, useDialog } from "@/components/ui/dialog";
interface Props {
  className?: string;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Web3Status: FC<Props> = ({ className, setNav }) => {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { isCurrentChainSupported } = useIsChainSupported();
  const { setOpen: setOpenSwitchChain } = useDialog(DialogType.SwitchChain);
  const { setOpen: setOpenConnector } = useDialog(DialogType.Connector);

  const walletMenuItems = [
    { title: "My Bets", link: "/my-bets", fn: () => null },
    { title: "My History", link: "/my-history", fn: () => null },
    { title: "Switch Network", link: "", fn: () => setOpenSwitchChain(true) },
    { title: "Disconnect", link: "", fn: disconnect },
  ];

  return (
    <div>
      {!isConnected && (
        <Button onClick={() => setOpenConnector(true)}>Connect Wallet</Button>
      )}
      {isConnected && address && (
        <>
          {isCurrentChainSupported ? (
            <>Wallet Connected</>
          ) : (
            // <WalletMenu
            //   heading={
            //     <WalletButtonWithAvatar
            //       className={className}
            //       displayName={getDisplayNameForAddress(address)}
            //     />
            //   }
            //   menu={walletMenuItems}
            //   account={getDisplayNameForAddress(address)}
            //   setNav={setNav}
            // />
            <>
              <Button
                variant={"secondary"}
                onClick={() => setOpenSwitchChain(true)}
              >
                Wrong network
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};
