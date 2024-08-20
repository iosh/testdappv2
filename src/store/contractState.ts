import type { Address } from "viem";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface contractState {
  deployed: {
    [key: string]:
      | {
          contractAddress: Address;
        }
      | undefined;
  };
  addDeployedContract: (key: string, contractAddress: Address) => void;
  removeDeployedContract: (key: string) => void;
}

export const useContractStore = create<contractState>()(
  persist(
    (set) => ({
      deployed: {},
      addDeployedContract: (key, contractAddress) =>
        set((state) => ({
          ...state,
          deployed: { ...state.deployed, [key]: { contractAddress } },
        })),
      removeDeployedContract: (key) => {
        set((state) => {
          return {
            ...state,
            deployed: { ...state.deployed, [key]: undefined },
          };
        });
      },
    }),
    {
      name: "contract-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
