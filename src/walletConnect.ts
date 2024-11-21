import { confluxESpace } from "viem/chains";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const metadata = {
  name: "Test Dapp",
  description: "Test Dapp",
  url: "https://testdappv2.vercel.app", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const rpcUrl = confluxESpace.rpcUrls.default.http[0];
const ethersConfig = defaultConfig({
  metadata,
  defaultChainId: 1030,
  rpcUrl: rpcUrl,
});

export const walletConnectModel = createWeb3Modal({
  projectId: import.meta.env.VITE_PROJECT_ID,
  ethersConfig,
  chains: [
    {
      chainId: confluxESpace.id,
      name: confluxESpace.name,
      currency: confluxESpace.nativeCurrency.symbol,
      explorerUrl: confluxESpace.blockExplorers.default.url,
      rpcUrl: rpcUrl,
    },
  ],
  enableAnalytics: false,
});
