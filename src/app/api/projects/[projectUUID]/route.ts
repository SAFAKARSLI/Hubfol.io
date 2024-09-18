import { validateUUID } from '@/app/actions/utils';
import { prisma } from '@/db';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { projectUUID: string } }
) {
  const { projectUUID } = params;

  if (!validateUUID(projectUUID as string)) {
    return new Response('Invalid project identifier provided: ' + projectUUID, {
      status: 400,
    });
  }
  try {
    const projects = await prisma.project.findUnique({
      where: { uuid: projectUUID as string },
      include: { sections: true },
    });

    if (!projects) {
      return new Response('Project not found', { status: 404 });
    }

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch projects', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
