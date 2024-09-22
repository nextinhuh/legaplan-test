import { NextResponse } from 'next/server'

export let TASKS = [
  {
    id: '8c40',
    name: 'Comprar pneu',
    completed: true,
  },
  {
    id: '7495',
    name: 'Ir passear',
    completed: false,
  },
  {
    id: 'aedd',
    name: 'Ir ao shopping',
    completed: true,
  },
]

function findItemIndex(id: string) {
  return TASKS.findIndex((task) => task.id === id)
}

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
  const itemIndex = findItemIndex(params.id)

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
  const itemIndex = findItemIndex(params.id)

  if (itemIndex === -1) {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 })
  }

  TASKS = TASKS.filter((task) => task.id !== params.id)
  return NextResponse.json({ message: 'Item deleted' })
}
