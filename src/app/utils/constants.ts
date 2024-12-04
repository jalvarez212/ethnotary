import { cva } from "class-variance-authority";
import {
  Network,
  Wallet,
  Banknote,
  CircleDollarSign,
  Binary,
} from "lucide-react";

export const Icons: Record<string, string> = {
  Injected: "/chainwalletIxon/Injected.svg",
  MetaMask: "/chainwalletIxon/MetaMask.svg",
  "Trust Wallet": "/chainwalletIxon/TrustWallet.svg",
  WalletConnect: "/chainwalletIxon/WalletConnect.svg",
  WalletConnectLegacy: "/chainwalletIxon/WalletConnect.svg",
  "Coinbase Wallet": "/chainwalletIxon/CoinbaseWallet.svg",
  "Brave Wallet": "/chainwalletIxon/Brave.svg",
  Phantom: "/chainwalletIxon/Phantom.svg",
};

export const ChainIcons: Record<number, any> = {
  1: Network, // Ethereum mainnet
  11155111: Wallet, // Sepolia
  56: Banknote, // BSC
  8453: Binary, // Base
  97: CircleDollarSign, // BSC Testnet
};

export const ChainNames: Record<number, string> = {
  1: "Ethereum",
  11155111: "Sepolia",
  56: "BSC",
  8453: "Base",
  97: "BSC Testnet",
};

export const dialogVariants = cva(
  "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default:
          "eight-bit-border-20 bg-white rounded-xl bottom-0 md:bottom-[unset] fixed left-[50%] md:top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] md:translate-y-[-50%] gap-4  p-6 shadow-lg  md:w-full data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-bottom-[48%] md:data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-bottom-[48%] md:data-[state=open]:slide-in-from-top-[48%]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const dialogOverlayVariants = cva(
  "fixed inset-0 z-50 transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
  {
    variants: {
      variant: {
        default: "bg-black/10 backdrop-blur-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const dialogCloseVariants = cva("", {
  variants: {
    variant: {
      default: "absolute top-6 right-6 cursor-pointer text-gray-900",
      opaque: "hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
