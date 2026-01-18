import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export const GET = function GET(request: NextRequest) {
  const authToken = request.headers.get('Revalidate-Cache-Auth-Token')

  if (!authToken || authToken !== process.env.REVALIDATE_CACHE_AUTH_TOKEN) {
    return NextResponse.json({ revalidated: false, time: Date.now(), message: 'invalid auth token' }, { status: 401 })
  }
  //test
  const type = request.nextUrl.searchParams.get('type')

  if (type === 'path') {
    const path = request.nextUrl.searchParams.get('path')
    const pathType = (request.nextUrl.searchParams.get('pathtype') as 'layout' | 'page') ?? 'layout'

    if (!path) {
      return NextResponse.json({ message: 'Missing path param' }, { status: 400 })
    }

    revalidatePath(path, pathType)

    return NextResponse.json({ revalidated: true, time: Date.now() })
  }

  const tag = request.nextUrl.searchParams.get('tag')

  revalidateTag(tag ?? 'contentful', 'default')

  return NextResponse.json({ revalidated: true, time: Date.now() })
}
