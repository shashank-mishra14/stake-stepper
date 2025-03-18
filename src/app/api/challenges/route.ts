// app/api/challenges/route.ts
import { NextResponse } from 'next/server'
import prisma  from '@/app/lib/prisma'

export async function GET() {
  const challenges = await prisma.challenge.findMany({
    include: {
      participants: true,
      creator: true
    }
  })
  return NextResponse.json(challenges)
}

export async function POST(request: Request) {
  const { name, targetSteps, stakeAmount, creatorId } = await request.json()
  
  const challenge = await prisma.challenge.create({
    data: {
      name,
      targetSteps,
      stakeAmount,
      creatorId,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 86400000) // 7 days
    }
  })
  
  return NextResponse.json(challenge)
}