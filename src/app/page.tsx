'use client'

import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function Home() {
  return (
    <main className="w-screen h-[300vh]">
      <ThemeToggle />
      Hola mundo!
      <Button onClick={() => signOut()}>Iniciar Sesión</Button>
    </main>
  )
}
