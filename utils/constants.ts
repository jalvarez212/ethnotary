import { cva } from "class-variance-authority";

export const Icons: Record<string, string> = {
  Injected: "/chainWalletIcon/Injected.svg",
  MetaMask: "/chainWalletIcon/MetaMask.svg",
  "Trust Wallet": "/chainWalletIcon/TrustWallet.svg",
  WalletConnect: "/chainWalletIcon/WalletConnect.svg",
  WalletConnectLegacy: "/chainWalletIcon/WalletConnect.svg",
  "Coinbase Wallet": "/chainWalletIcon/CoinbaseWallet.svg",
  "Brave Wallet": "/chainWalletIcon/Brave.svg",
  Phantom: "/chainWalletIcon/Phantom.svg",
};

export const dialogVariants = cva(
  "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default:
          "eight-bit-border-20 bg-blue-dark bottom-0 md:bottom-[unset] fixed left-[50%] md:top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] md:translate-y-[-50%] gap-4  p-6 shadow-lg  md:w-full data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-bottom-[48%] md:data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-bottom-[48%] md:data-[state=open]:slide-in-from-top-[48%]",
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
      default: "absolute top-6 right-6 cursor-pointer",
      opaque: "hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
