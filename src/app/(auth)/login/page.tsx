'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function LoginPage() {
  const { connected } = useWallet()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-purple-600">
          Welcome to StakeStepper
        </h1>
        <div className="flex justify-center">
          <WalletMultiButton className="bg-purple-500 hover:bg-purple-600" />
        </div>
        {connected && (
          <p className="text-center text-gray-600 mt-4">
            Connect your fitness tracker next
          </p>
        )}
      </div>
    </div>
  )
}