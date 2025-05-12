import { validateUUID } from "@/app/actions/utils";
import { prisma } from "@/db";

export const dynamic = "force-dynamic";
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
    const sections = await prisma.section.findMany({
      where: { projectId: projectUUID as string },
      orderBy: { createdAt: "asc" },
    });

    if (!sections) {
      return new Response("No sections found", { status: 404 });
    }

    return new Response(JSON.stringify(sections), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error. Failed to fetch sections", {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
