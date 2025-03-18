import { Cluster, clusterApiUrl, PublicKey } from '@solana/web3.js'

export const SOLANA_CLUSTER: Cluster = 'devnet'
export const SOLANA_RPC_ENDPOINT = clusterApiUrl(SOLANA_CLUSTER)

export const CHALLENGE_PROGRAM_ID = new PublicKey(
  'YourProgramPublicKeyHere'
)