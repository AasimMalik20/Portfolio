import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const expected = `Bearer ${process.env.REVALIDATE_SECRET}`

  if (!process.env.REVALIDATE_SECRET || auth !== expected) {
    return new Response(null, { status: 401 })
  }

  revalidateTag('sheet-data')
  return Response.json({ revalidated: true, at: new Date().toISOString() })
}

// Reject all other HTTP methods
export async function GET() {
  return new Response(null, { status: 405 })
}
