import { TASKS } from '@/utils/mock'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const item = TASKS.find((task) => task.id === params.id)

  if (!item) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 })
  }

  return NextResponse.json(item)
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const itemIndex = TASKS.findIndex((task) => task.id === params.id)

  if (itemIndex === -1) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 })
  }

  const body = await req.json()
  const { name, completed } = body

  TASKS[itemIndex] = { ...TASKS[itemIndex], name, completed }

  return NextResponse.json(TASKS[itemIndex])
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const itemIndex = TASKS.findIndex((task) => task.id === params.id)

  if (itemIndex === -1) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 })
  }

  TASKS.splice(itemIndex, 1)

  return NextResponse.json({ message: 'Item deleted' })
}
