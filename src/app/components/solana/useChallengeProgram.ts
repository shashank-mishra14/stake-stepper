import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

export const useChallengeProgram = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const joinChallenge = async (challengeId: string, stakeAmount: number) => {
    if (!publicKey) throw new Error('Wallet not connected')
    
    const transaction = await createChallengeTx(publicKey, challengeId, stakeAmount)
    const signature = await sendTransaction(transaction, connection)
    
    return {
      txId: signature,
      explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`
    }
  }

  return { joinChallenge }
}

function createChallengeTx(publicKey: PublicKey, challengeId: string, stakeAmount: number) {
    throw new Error('Function not implemented.')
}
