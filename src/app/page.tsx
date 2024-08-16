import { getServerSession } from "next-auth"

export default async function page() {
  const session = await getServerSession()

  return (
    <div>
      <div>Name: {session?.user?.name}</div>
      <div>Email: {session?.user?.email}</div>
      <div>Image: {session?.user?.image}</div>
    </div>
  )
}