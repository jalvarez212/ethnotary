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
} from "@/src/app/components/ui/dialog";
import Spinner from "@/src/app/components/ui/spinner";
import { useToast } from "@/src/app/hooks/use-toast";
import { Icons } from "@/src/app/utils/constants";

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
          <DialogTitle className="!text-2xl text-gray-900">
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription className="!text-base text-gray-600">
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
                className="flex justify-between rounded-md items-center border my-2 cursor-pointer p-2 hover:bg-gray-50"
              >
                <h4 className="text-lg text-gray-900">{connector.name}</h4>
                {isPending && connector.id === pendingConnectorId ? (
                  <Spinner className="text-gray-600" />
                ) : (
                  <Image
                    src={iconSrc}
                    alt={connector.name}
                    width={32}
                    height={32}
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
