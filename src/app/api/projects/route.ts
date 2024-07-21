import { NextResponse, NextRequest } from 'next/server'
import { fetchProjects, fetchPartialProjects } from '@/app/actions';


export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams
  const sections = query.get('sections')

  if (sections === 'initial') {
    var projects = await fetchPartialProjects();
  } else{
    projects = await fetchProjects();
  }
  return NextResponse.json(projects, {status: 200})
}