import { ThemeToggle } from "@/components/ThemeToggle"

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <ThemeToggle />
      {children}
    </div>
  )
}
