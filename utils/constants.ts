import { cva } from "class-variance-authority";

export const Icons: Record<string, string> = {
  Injected: "../public/chainwalletIxon/Injected.svg",
  MetaMask: "../public/chainwalletIxon/MetaMask.svg",
  "Trust Wallet": "../public/chainwalletIxon/TrustWallet.svg",
  WalletConnect: "../public/chainwalletIxon/WalletConnect.svg",
  WalletConnectLegacy: "../public/chainwalletIxon/WalletConnect.svg",
  "Coinbase Wallet": "../public/chainwalletIxon/CoinbaseWallet.svg",
  "Brave Wallet": "../public/chainwalletIxon/Brave.svg",
  Phantom: "../public/chainwalletIxon/Phantom.svg",
};

export const dialogVariants = cva(
  "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default:
          "eight-bit-border-20 bg-clay-f5f8fa bottom-0 md:bottom-[unset] fixed left-[50%] md:top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] md:translate-y-[-50%] gap-4  p-6 shadow-lg  md:w-full data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-bottom-[48%] md:data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-bottom-[48%] md:data-[state=open]:slide-in-from-top-[48%]",
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
