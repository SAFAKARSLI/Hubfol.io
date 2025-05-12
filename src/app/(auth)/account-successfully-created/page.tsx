import { baseUrl } from "@/utils";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function AccountSuccessfullyCreated() {
  const user = await currentUser();

  if (user && user.username) {
    redirect(`${baseUrl}/u/${user.username}/projects`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-2">
        <FaCheckCircle className="text-green-500 text-4xl" />

        <h1 className="text-2xl font-bold">Account Successfully Created</h1>
        <p className="text-gray-500">
          You will be redirected to the employee page in 5 seconds.
        </p>
        <Link href={`${baseUrl}/u/${user?.username}/projects`}>
          <Button>Go to Employee Page</Button>
        </Link>
      </div>
    </div>
  );
}
