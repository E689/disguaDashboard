import {Button} from "@/components/ui/button";
import {ThemeToggle} from "@/components/ThemeToggle";

export default function UserAuthLayout({children}: { children: React.ReactNode }) {

    return (
        <main className="w-screen h-dvh">
            {/** Separar layout del page */}
            <ThemeToggle/>
            <div className="flex w-full h-full">
                <nav
                    className='dark:bg-neutral-900 border shadow h-full max-w-[500px] w-1/3 min-w-[100px] p-5 flex flex-col gap-5'>
                    <h2 className="text-3xl text-center">Maquinas</h2>
                    <div className="flex flex-col gap-2">
                        <Button variant='default'>Maquina $</Button>
                        <Button variant='default'>Maquina $</Button>
                        <Button variant='default'>Maquina $</Button>
                        <Button variant='default'>Maquina $</Button>
                    </div>
                </nav>
                {children}
            </div>
        </main>
    )
}