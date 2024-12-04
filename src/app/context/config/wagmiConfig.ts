import { QueryClient } from "@tanstack/react-query";
import { createClient } from "viem";
import { createConfig, http } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { base, bsc, bscTestnet, mainnet, sepolia } from "wagmi/chains";
import { createConnector } from "wagmi";
import { HiChevronDoubleDown } from "react-icons/hi";
import MetaMaskIcon from "@/public/chainwalletIxon/MetaMask.svg";

const WALLET_CONNECT_PROJECT_ID = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

function injectedWithFallback() {
  return createConnector((config) => {
    const injectedConnector = injected()(config);

    return {
      ...injectedConnector,
      connect(...params) {
        if (typeof window !== "undefined" && !window.ethereum) {
          window.open("https://metamask.io/", "inst_metamask");
        }
        return injectedConnector.connect(...params);
      },
      get icon() {
        if (typeof window !== "undefined") {
          return !window.ethereum || window.ethereum?.isMetaMask
            ? MetaMaskIcon
            : HiChevronDoubleDown;
        }
        return HiChevronDoubleDown; // Fallback icon for SSR
      },
      get name() {
        if (typeof window !== "undefined") {
          return !window.ethereum
            ? "Install MetaMask"
            : window.ethereum?.isMetaMask
            ? "MetaMask"
            : "Browser Wallet";
        }
        return "Browser Wallet"; // Default name for SSR
      },
    };
  });
}

export const WC_PARAMS = {
  projectId: WALLET_CONNECT_PROJECT_ID,
  metadata: {
    name: "Ethnotary",
    description: "Manage you wallet activity",
    url: "https://www.ethnotary.io/",
    icons: [""],
  },
  qrModalOptions: {
    themeVariables: {
      "--wcm-font-family": '"Jersey 10", sans-serif',
      "--wcm-z-index": "1060",
    },
  },
};

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, bsc, base, bscTestnet],
  connectors: [
    injectedWithFallback(),
    walletConnect(WC_PARAMS),
    coinbaseWallet({
      appName: "DegenMarket",
      reloadOnDisconnect: false,
    }),
  ],
  client({ chain }) {
    return createClient({
      chain,
      pollingInterval: 12_000,
      transport: http(), // Use HTTP transport for RPC requests; we can add our custom RPC endpoints (e.g., Infura or Alchemy) to handle huge RPC request to EVM from our application.
    });
  },
  ssr: true,
});

export const queryClient = new QueryClient();

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
