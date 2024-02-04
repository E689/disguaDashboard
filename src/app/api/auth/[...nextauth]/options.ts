import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("NEXTAUTH_SECRET", process.env.NEXTAUTH_SECRET)

export const options: NextAuthOptions = {
  debug: true,
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 24 * 60 * 60, // 24 hrs
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Nombre de usuario", type: "text", placeholder: "admin" },
        password: { label: "Contraseña", type: "password", placeholder: "********" },
      },
      async authorize(credentials, req) {

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        const { user, message } = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }

        // Throw custom error message from server response.
        if (!res.ok) {
          throw new Error(message)
        }

        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  }
}