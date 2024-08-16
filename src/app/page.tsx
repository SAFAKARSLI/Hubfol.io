import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function page() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <div>Name: {session?.user?.name}</div>
      <div>Email: {session?.user?.email}</div>
      <div>Image: {session?.user?.image}</div>
    </div>
  )
}