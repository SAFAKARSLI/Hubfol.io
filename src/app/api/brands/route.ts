import { BrandRepository } from "@/db";

export const dynamic = "force-dynamic";

const brandRepository = new BrandRepository();

export async function GET(request: Request) {
  try {
    const url = request?.url ? new URL(request.url) : null;
    const query = url?.searchParams.get("query");

    if (!query) {
      return new Response("No query provided", { status: 400 });
    }

    const brands = await brandRepository.findBrandsByQuery(query);

    return new Response(JSON.stringify(brands), { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return new Response("Internal Server Error. Failed to fetch sections", {
      status: 500,
    });
  }
}
