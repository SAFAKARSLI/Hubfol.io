import { validateUUID } from '@/app/actions/utils';
import { prisma } from '@/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const init = searchParams.get('init');

  if (!username) {
    return new Response('Bad Request. Missing username', { status: 400 });
  }

  try {
    const owner = await prisma.employee.findUnique({
      where: { username },
      select: { uuid: true },
    });

    if (!owner) {
      return new Response('Not Found. User not found', { status: 404 });
    }

    const projects = await prisma.project.findMany({
      where: { ownerId: owner?.uuid },
      orderBy: { createdAt: 'asc' },
      // include: {
      //   sections: {
      //     orderBy: { createdAt: 'asc' },
      //   },
      // },
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
