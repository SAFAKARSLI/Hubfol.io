import { validateUUID } from "@/utils";
import { SectionRepository } from "@/db";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

const sectionRepository = new SectionRepository();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectUUID = searchParams.get("projectUUID");

  if (!validateUUID(projectUUID as string)) {
    return new Response(
      "Bad request. Invalid project identifier provided: " + projectUUID,
      {
        status: 400,
      }
    );
  }

  try {
    const sections = await sectionRepository.findSectionsByProjectUuid(
      projectUUID as string
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
