'use client'

import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function Dashboard() {

  return (
    <main className="w-screen h-[300vh]">
      <ThemeToggle />
      Hola mundo desde el Dashboard!
      <Button onClick={() => signOut()}>Cerrar Sesión</Button>
    </main>
  )
}