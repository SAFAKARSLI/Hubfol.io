import { prisma } from '@/db';
import { extractUserUUID } from '@/utils';
import { NextApiRequest } from 'next';

export async function GET(request: Request) {
  const userUUID = extractUserUUID(request.url);
  if (!userUUID || typeof userUUID !== 'string') {
    return new Response('User UUID is required', { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
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
