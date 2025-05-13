// backend api that returns the specifiec section [sectionUUID from useParams()] for a project [projectUUID from useParams()]

import { validateUUID } from "@/utils";
import { SectionRepository } from "@/db";

export const dynamic = "force-dynamic";

const sectionRepository = new SectionRepository();

export async function GET(
  request: Request,
  { params }: { params: { sectionUUID: string } }
) {
  const sectionUUID = params.sectionUUID;

  if (!validateUUID(sectionUUID as string)) {
    return new Response(
      "Bad request. Invalid section identifier provided: " + sectionUUID,
      {
        status: 400,
      }
    );
  }

  try {
    const section = await sectionRepository.findSectionByUuid(
      sectionUUID as string
    );

    if (!section) {
      return new Response("No section found", { status: 404 });
    }

    return new Response(JSON.stringify(section), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error. Failed to fetch section", {
      status: 500,
    });
  }
}
