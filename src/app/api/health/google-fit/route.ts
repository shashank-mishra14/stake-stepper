import { NextResponse } from 'next/server'
import prisma  from '@/app/lib/prisma'
export async function POST(request: Request) {
  const { accessToken, challengeId } = await request.json()
  
  try {
    const response = await fetch(
      'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
          bucketByTime: { durationMillis: 86400000 }, // Daily
          startTimeMillis: Date.now() - 86400000, // Last 24h
          endTimeMillis: Date.now()
        })
      }
    )

    const data = await response.json()
    const steps = data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0

    // Update database
    await prisma.participation.update({
      where: { challengeId_userId: { challengeId, userId: 'yourUserId' } }, // Replace 'yourUserId' with actual userId
      data: { currentSteps: steps }
    })

    return NextResponse.json({ success: true, steps })
  }catch {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}