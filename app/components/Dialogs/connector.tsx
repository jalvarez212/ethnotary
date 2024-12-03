"use client";
import { FC, useCallback, useMemo, useState } from "react";
import { useConnect } from "wagmi";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogType,
  useDialog,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/utils/constants";

const ConnectorDialog: FC = () => {
  const { connectors, isPending, connectAsync } = useConnect();
  const [pendingConnectorId, setPendingConnectorId] = useState("");
  const { open, setOpen } = useDialog(DialogType.Connector);
  const { toast } = useToast();

  const onSelect = useCallback(
    async (connectorId: string) => {
      try {
        const connector = connectors.find((el) => el.id === connectorId);
        if (!connector) throw new Error("Connector not found");
        await connectAsync({ connector });
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
    },
    [connectAsync, connectors, setOpen, toast]
  );

  const _connectors = useMemo(() => {
    const conns = [...connectors];
    const injected = conns.find((el) => el.id === "injected");
    if (injected) {
      return [
        injected,
        ...conns.filter(
          (el) => el.id !== "injected" && el.name !== injected.name
        ),
      ];
    }
    return conns;
  }, [connectors]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-4xl">Connect Your Wallet</DialogTitle>
          <DialogDescription className="!text-2xl">
            Please select a wallet to connect.
          </DialogDescription>
        </DialogHeader>
        <div className="modal-body">
          {_connectors.map((connector) => {
            const iconSrc =
              connector.name in Icons ? Icons[connector.name] : Icons.Injected;

            return (
              <div
                onClick={() => {
                  onSelect(connector.id);
                  setPendingConnectorId(connector.id);
                }}
                key={connector.id}
                className="flex justify-between items-center border my-2 cursor-pointer p-2"
              >
                <h4 className="text-3xl">{connector.name}</h4>
                {isPending && connector.id === pendingConnectorId ? (
                  <p>Loading...</p>
                ) : (
                  <Image
                    src={iconSrc}
                    alt={connector.name}
                    width={40}
                    height={40}
                  />
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectorDialog;
