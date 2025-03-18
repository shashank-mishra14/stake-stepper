import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    
    // Verify webhook signature here (Fitbit-specific verification)
    
    const { userId, steps } = payload
    
    // Update user's step count in active challenges
    await prisma.participation.updateMany({
      where: {
        userId,
        challenge: {
          endDate: { gt: new Date() }
        }
      },
      data: {
        currentSteps: {
          increment: steps
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}