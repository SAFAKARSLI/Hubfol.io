import { NextResponse, NextRequest } from 'next/server'
import { fetchProject } from '@/app/actions';
import { revalidatePath } from 'next/cache';


export async function GET(req: NextRequest, {params}: { params: { _id: string}}) {
  const _id = params._id;
  const project = await fetchProject(_id);
  return NextResponse.json(project, {status: 200})
}