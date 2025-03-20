import { Program, AnchorProvider } from "@project-serum/anchor";
import { StakeStepper } from "@/programs/stake_stepper";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

export const useStakeStepperProgram = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  return new Program<StakeStepper>(
    STAKE_STEPPER_IDL,
    STAKE_STEPPER_PROGRAM_ID,
    new AnchorProvider(connection, wallet, {})
  );
};