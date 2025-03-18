'use client'
import { useWallet } from '@solana/wallet-adapter-react'

export function TransactionStatus() {
  const { connecting, disconnecting } = useWallet()

  return (
    <div className="fixed top-4 right-4">
      {connecting && <div className="bg-blue-100 p-2 rounded">Connecting...</div>}
      {disconnecting && <div className="bg-yellow-100 p-2 rounded">Disconnecting...</div>}
    </div>
  )
}