import { NextResponse, NextRequest } from 'next/server'
import { fetchPartial } from '@/app/actions';


export async function GET(req: NextRequest, {params}: { params: { _id: string}}) {
  const _id = params._id;
  const project = await fetchPartial(_id, ['url']);
  return NextResponse.json(project, {status: 200})
}