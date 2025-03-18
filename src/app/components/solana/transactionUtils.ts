import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
import { SOLANA_RPC_ENDPOINT } from '@/app/config/solana'

export const createChallengeTx = async (
  publicKey: PublicKey,
  challengeId: string,
  stakeAmount: number
) => {
  const connection = new Connection(SOLANA_RPC_ENDPOINT)
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey('EscrowAccountPublicKeyHere'),
      lamports: stakeAmount * 1000000000 // Convert SOL to lamports
    })
  )
  
  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  transaction.feePayer = publicKey
  
  return transaction
}