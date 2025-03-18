export function ProgressBar({ progress }: { progress: number }) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-purple-500 rounded-full h-4 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    )
  }