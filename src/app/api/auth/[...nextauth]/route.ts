import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/db"

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client, {
    databaseName: "dev"
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }