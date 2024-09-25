import { validateUUID } from '@/app/actions/utils';
import { prisma } from '@/db';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userUUID = searchParams.get('userUUID');
  if (!validateUUID(userUUID!)) {
    return new Response(
      'Bad request. Invalid or no user identifier provided.',
      { status: 400 }
    );
  }

  cookies().set('uid', userUUID as string);

  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: userUUID as string },
      orderBy: { createdAt: 'asc' },
      include: { sections: true },
    });

    if (!projects) {
      return new Response('No projects found', { status: 404 });
    }

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error. Failed to fetch projects', {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
