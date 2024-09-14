import { validateUUID } from '@/app/actions/utils';
import { prisma } from '@/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectUUID = searchParams.get('projectUUID');

  if (!validateUUID(projectUUID as string)) {
    return new Response(
      'Bad request. Invalid project identifier provided: ' + projectUUID,
      {
        status: 400,
      }
    );
  }

  try {
    const sections = await prisma.section.findMany({
      where: { projectId: projectUUID as string },
    });

    return new Response(JSON.stringify(sections), { status: 200 });
  } catch (error) {
    throw new Error('Failed to fetch sections');
  } finally {
    await prisma.$disconnect();
  }
}
