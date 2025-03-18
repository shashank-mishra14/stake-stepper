'use client'
import { useChallengeProgram } from './useChallengeProgram'
import { useState } from 'react'

export function ChallengeParticipationButton({ challengeId, stakeAmount }) {
  const { joinChallenge } = useChallengeProgram()
  const [loading, setLoading] = useState(false)

  const handleJoin = async () => {
    try {
      setLoading(true)
      const result = await joinChallenge(challengeId, stakeAmount)
      console.log('Transaction successful:', result)
    } catch (error) {
      console.error('Transaction failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleJoin}
      disabled={loading}
      className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 disabled:bg-gray-400"
    >
      {loading ? 'Processing...' : `Stake ${stakeAmount} SOL`}
    </button>
  )
}