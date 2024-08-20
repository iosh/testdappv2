import { confluxESpaceTestnet } from "viem/chains";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const metadata = {
  name: "Test Dapp",
  description: "Test Dapp",
  url: "https://testdappv2.vercel.app", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const ethersConfig = defaultConfig({
  metadata,
  defaultChainId: 71,
  rpcUrl: confluxESpaceTestnet.rpcUrls.default.http[0],
});

export const walletConnectModel = createWeb3Modal({
  projectId: import.meta.env.VITE_PROJECT_ID,
  ethersConfig,
  chains: [
    {
      chainId: confluxESpaceTestnet.id,
      name: confluxESpaceTestnet.name,
      currency: confluxESpaceTestnet.nativeCurrency.symbol,
      explorerUrl: confluxESpaceTestnet.blockExplorers.default.url,
      rpcUrl: confluxESpaceTestnet.rpcUrls.default.http[0],
    },
  ],
  enableAnalytics: false,
});
