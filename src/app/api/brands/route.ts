import { prisma } from "@/db";
import { Brand } from "@/types/brand";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = request?.url ? new URL(request.url) : null;
    const query = url?.searchParams.get("query");

    if (!query) {
      return new Response("No query provided", { status: 400 });
    }

    const brands = (await prisma.brandIcons.findMany({
      take: 30,
      where: { brand_name: { contains: query, mode: "insensitive" } },
    })) as Brand[];

    return new Response(JSON.stringify(brands), { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return new Response("Internal Server Error. Failed to fetch sections", {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
