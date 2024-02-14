import {Button} from "@/components/ui/button";
import {ThemeToggle} from "@/components/ThemeToggle";

export default function UserAuthLayout({children}: { children: React.ReactNode }) {

    return (
        <main className="w-full h-dvh">
            {/** Separar layout del page */}
            <ThemeToggle/>
            {children}
        </main>
    )
}