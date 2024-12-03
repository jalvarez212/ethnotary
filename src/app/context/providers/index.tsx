"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Toaster } from "@/components/ui/toaster";
import { queryClient, wagmiConfig } from "../config/wagmiConfig";
import { DialogProvider } from "@/components/ui/dialog";

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
