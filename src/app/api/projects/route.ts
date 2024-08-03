import { NextResponse, NextRequest } from 'next/server'
import { fetchProjects } from '@/app/actions';


export async function GET(req: NextRequest) {
  // const query = req.nextUrl.searchParams
  // const sections = query.get('sections')

  var projects = await fetchProjects();
  
  return NextResponse.json(projects, {status: 200})
}