import { EmployeeRepository } from "@/db";
import { extractSlug } from "@/utils";

export const dynamic = "force-dynamic";

const employeeRepository = new EmployeeRepository();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.pathname.split("/").pop();
  console.log("username recieved from u/username route ", username);

  if (!username) {
    return new Response("Username is not provided.", { status: 400 });
  }

  try {
    const user = await employeeRepository.findEmployeeByUsername(
      username as string
    );

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
