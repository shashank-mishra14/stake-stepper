'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export function WalletConnector() {
  const { publicKey } = useWallet()

  return (
    <div className="flex items-center gap-4">
      <WalletMultiButton className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg" />
      {publicKey && (
        <span className="text-sm text-gray-600">
          Connected: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </span>
      )}
    </div>
  )
}