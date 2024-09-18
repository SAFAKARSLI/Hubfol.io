import { validateUUID } from '@/app/actions/utils';
import { prisma } from '@/db';
import { extractUUID } from '@/utils';
import { notFound } from 'next/navigation';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userUUID = extractUUID(url.pathname, 'users');

  if (!userUUID || !validateUUID(userUUID)) {
    return new Response('User UUID is required', { status: 400 });
  }

  try {
    const user = await prisma.employee.findUnique({
      where: { uuid: userUUID as string },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
