import { validateUUID } from '@/app/actions/utils';
import { prisma } from '@/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userUUID = searchParams.get('userUUID');
  if (!validateUUID(userUUID!)) {
    return new Response(
      'Bad request. Invalid or no user identifier provided.',
      { status: 400 }
    );
  }

  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: userUUID as string },
      orderBy: { createdAt: 'asc' },
      include: { sections: true },
    });

    if (!projects) {
      return new Response(JSON.stringify([]), { status: 200 });
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
