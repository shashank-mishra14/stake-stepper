import { ProgressBar } from "./ProgressBar";

interface Challenge {
  name: string;
  targetSteps: number;
  stakeAmount: number | string;
  currentSteps: number;
  daysRemaining: number;
}

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{challenge.name}</h3>
            <p className="text-gray-600 mt-2">
              Goal: {challenge.targetSteps} steps/day
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              ${challenge.stakeAmount} staked
            </span>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar
            progress={challenge.currentSteps / challenge.targetSteps * 100}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>{challenge.currentSteps} steps</span>
            <span>{challenge.daysRemaining} days left</span>
          </div>
        </div>
      </div>
    )
  }