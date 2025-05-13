import { EmployeeRepository, ProjectRepository } from "@/db";

export const dynamic = "force-dynamic";

const employeeRepository = new EmployeeRepository();
const projectRepository = new ProjectRepository();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response("Bad Request. Missing username", { status: 400 });
  }

  try {
    const owner = await employeeRepository.findEmployeeByUsername(username);

    if (!owner) {
      return new Response("Not Found. User not found", { status: 404 });
    }
    const projects = await projectRepository.findProjectsByOwnerId(owner.uuid);
    if (!projects) {
      return new Response(JSON.stringify([]), { status: 200 });
    }
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
