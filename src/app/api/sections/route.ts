import { validateUUID } from "@/utils";
import { SectionRepository } from "@/db";

const sectionRepository = new SectionRepository();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectSlug = searchParams.get("projectSlug");

  try {
    const sections = await sectionRepository.findSectionsByProjectSlug(
      projectSlug as string
    );

    if (!sections) {
      return new Response("No sections found", { status: 404 });
    }

    return new Response(JSON.stringify(sections), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error. Failed to fetch sections", {
      status: 500,
    });
  }
}
