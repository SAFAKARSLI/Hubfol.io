import { validateUUID } from '@/app/actions/utils';
import { prisma } from '@/db';
import { Brand } from '@/types/brand';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  console.log('query:', query);
  console.log('query:', query);
  console.log('query:', query);
  console.log('query:', query);
  console.log('query:', query);
  console.log('query:', query);

  if (!query) {
    return new Response('No query provided', { status: 400 });
  }

  try {
    const brands = (await prisma.brandIcons.findMany({
      take: 30,
      where: { brand_name: { contains: query, mode: 'insensitive' } },
    })) as Brand[];
    return new Response(JSON.stringify(brands), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error. Failed to fetch sections', {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
