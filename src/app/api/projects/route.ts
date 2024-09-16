import { validateUUID } from '@/app/actions/utils';
import { prisma } from '@/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userUUID = searchParams.get('userUUID');
  if (!(await validateUUID(userUUID!))) {
    return new Response('User UUID is required', { status: 400 });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: userUUID as string },
      include: { sections: true },
    });
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch projects', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
