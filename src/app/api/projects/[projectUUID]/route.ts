import { validateUUID } from "@/utils";
import { ProjectRepository } from "@/db";
import { NextRequest } from "next/server";

const projectRepository = new ProjectRepository();

// GET /api/projects/[projectUUID]
export async function GET(
  request: NextRequest,
  { params }: { params: { projectUUID: string } }
) {
  const { projectUUID } = params;

  if (!validateUUID(projectUUID as string)) {
    return new Response("Invalid project identifier provided: " + projectUUID, {
      status: 400,
    });
  }
  try {
    const project = await projectRepository.findProjectByUuid(
      projectUUID as string
    );

    if (!project) {
      return new Response("Project not found", { status: 404 });
    }

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch projects", { status: 500 });
  }
}
