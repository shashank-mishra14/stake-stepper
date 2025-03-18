'use client'
import { useConnection } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'

export function NetworkStatus() {
  const { connection } = useConnection()
  const [status, setStatus] = useState<'connected' | 'disconnected'>('disconnected')

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await connection.getVersion()
        setStatus('connected')
      } catch {
        setStatus('disconnected')
      }
    }
    
    checkStatus()
    const interval = setInterval(checkStatus, 10000)
    return () => clearInterval(interval)
  }, [connection])

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
      <span className="text-sm text-gray-600">
        Solana {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  )
}