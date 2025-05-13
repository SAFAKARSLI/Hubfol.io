import { EmployeeRepository } from "@/db";

const employeeRepository = new EmployeeRepository();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.pathname.split("/").pop();

  if (!username) {
    return new Response("Employee identifier (username) required.", {
      status: 400,
    });
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
