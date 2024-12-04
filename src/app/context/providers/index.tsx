"use client";

import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Toaster } from "@/src/app/components/ui/toaster";
import { queryClient, wagmiConfig } from "../config/wagmiConfig";
import { DialogProvider } from "@/src/app/components/ui/dialog";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <DialogProvider>{children}</DialogProvider>
        <Toaster />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
