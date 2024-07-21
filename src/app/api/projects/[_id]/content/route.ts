import { NextResponse, NextRequest } from 'next/server'
import { fetchContent } from '@/app/actions';


export async function GET(req: NextRequest, {params}: { params: { _id: string}}) {
  const _id = params._id;
  const project = await fetchContent(_id);
  return NextResponse.json(project, {status: 200})
}