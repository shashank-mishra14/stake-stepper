import { useQuery } from '@tanstack/react-query'

export const useChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const response = await fetch('/api/challenges')
      return response.json()
    }
  })
}