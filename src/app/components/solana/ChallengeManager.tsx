'use client'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Program, AnchorProvider } from '@project-serum/anchor'
import { useCallback, useState } from 'react'

export const ChallengeManager = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [loading, setLoading] = useState(false)

  const initializeChallenge = useCallback(async () => {
    setLoading(true)
    try {
      const provider = new AnchorProvider(connection, wallet, {})
      const program = new Program(IDL, programId, provider)
      
      const [challengePDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("challenge"), publicKey.toBuffer()],
        program.programId
      )

      await program.methods
        .initializeChallenge("challenge-01", 5000, 7, new BN(100000000))
        .accounts({
          challenge: challengePDA,
          creator: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc()
    } finally {
      setLoading(false)
    }
  }, [publicKey, connection])

  return (
    <div>
      <button onClick={initializeChallenge} disabled={!publicKey || loading}>
        {loading ? 'Creating...' : 'Create New Challenge'}
      </button>
    </div>
  )
}