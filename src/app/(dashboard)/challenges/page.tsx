import { useChallenges } from '@/app/hooks/useChallenge'
import {ChallengeCard} from '@/app/components/challenges/ChallengeCard'
import {CreateChallengeModal} from '@/app/components/challenges/CreateChallengeModal'

export default function ChallengesPage() {
  const { data: challenges, isLoading } = useChallenges()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Active Challenges</h2>
        <CreateChallengeModal />
      </div>
      
      {isLoading ? (
        <div>Loading challenges...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges?.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  )
}