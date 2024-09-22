import { NextResponse } from 'next/server'
import { TASKS } from './[id]/route'
import { randomUUID } from 'crypto'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, completed } = body

  const taskCreated = { id: randomUUID(), name, completed }

  TASKS.push(taskCreated)

  return NextResponse.json(taskCreated)
}

export async function GET() {
  return NextResponse.json(TASKS)
}
