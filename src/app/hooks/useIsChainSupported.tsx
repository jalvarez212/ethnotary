import { useAccount, useConfig } from "wagmi";
const useIsChainSupported = () => {
  const { chainId } = useAccount();
  const { chains: wagmiChains } = useConfig();
  const chain = wagmiChains.find((chain) => chain.id === chainId);
  const isCurrentChainSupported = chain !== undefined;

  return { isCurrentChainSupported, chainId, chain };
};

export default useIsChainSupported;
