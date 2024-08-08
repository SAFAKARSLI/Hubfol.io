import { NextResponse, NextRequest } from 'next/server'
import { fetchProjects } from '@/app/actions';
import { revalidatePath } from 'next/cache';


export async function GET(req: NextRequest) {
  var projects = await fetchProjects();
  return NextResponse.json(projects, {status: 200})
}