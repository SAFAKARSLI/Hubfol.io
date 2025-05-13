import { validateUUID } from "@/utils";
import { SectionRepository } from "@/db";
import Section from "@/types/section";

const sectionRepository = new SectionRepository();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectSlug = searchParams.get("projectSlug");
  const projectUUID = searchParams.get("projectUUID");

  try {
    var sections: Section[] = [];
    if (projectSlug) {
      sections = await sectionRepository.findSectionsByProjectSlug(
        projectSlug as string
      );
    } else if (projectUUID) {
      sections = await sectionRepository.findSectionsByProjectUuid(
        projectUUID as string
      );
    }

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
