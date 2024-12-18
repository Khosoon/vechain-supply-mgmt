import { getConfig } from "@repo/config";
import { Fiorino__factory } from "@repo/contracts";
import { useCallback, useMemo } from "react";
import { useBuildTransaction } from "../utils";
import { buildClause } from "../utils/buildClause";
import { getFiorinoBalanceQueryKey } from "./useFiorinoBalance";
import { useWallet } from "@vechain/dapp-kit-react";
import { ethers } from "ethers";

const GovernorInterface = Fiorino__factory.createInterface();

type Props = { onSuccess?: () => void };

type useSendFiorinoParams = {
  amount: string;
  receiver: string;
};

export const useSendFiorino = ({ onSuccess }: Props) => {
  const { account } = useWallet();

  const clauseBuilder = useCallback(
    ({ amount, receiver }: useSendFiorinoParams) => {
      const contractAmount = ethers.parseEther(amount);
      return [
        buildClause({
          to: getConfig(import.meta.env.VITE_APP_ENV).fiorinoContractAddress,
          contractInterface: GovernorInterface,
          method: "transfer",
          args: [receiver, contractAmount],
          comment: "transfer fiorino",
        }),
      ];
    },
    []
  );

  const refetchQueryKeys = useMemo(
    () => [getFiorinoBalanceQueryKey(account || "")],
    [account]
  );

  return useBuildTransaction({
    clauseBuilder,
    refetchQueryKeys,
    onSuccess,
  });
};
