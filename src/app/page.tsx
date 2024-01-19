'use client'

import {ThemeToggle} from "@/components/ThemeToggle"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input";

export default function Home() {
    return (
        <main className="w-screen h-dvh">
            <ThemeToggle/>
            {/*<Button onClick={() => signOut()}>Iniciar Sesión</Button>*/}
            <div className="flex w-full h-full">
                <nav className='border shadow h-full max-w-[500px] w-1/3 min-w-[100px] p-5 flex flex-col gap-5'>
                    <h2 className="text-3xl text-center">Maquinas</h2>
                    <div className="flex flex-col gap-2">
                        <Button variant='default'>Maquina $</Button>
                        <Button variant='default'>Maquina $</Button>
                        <Button variant='default'>Maquina $</Button>
                        <Button variant='default'>Maquina $</Button>
                    </div>
                </nav>
                <div className='flex flex-col gap-5 items-center w-full p-4'>
                    <div>
                        <Input className='w-[50ch]' placeholder='Busca por dia'></Input>
                    </div>
                    <div className='w-full overflow-y-scroll'>
                        <div className="border p-10"></div>
                        <div className="border p-10"></div>
                        <div className="border p-10"></div>
                        <div className="border p-10"></div>
                        <div className="border p-10"></div>
                        <div className="border p-10"></div>
                        <div className="border p-10"></div>
                        <div className="border p-10"></div>
                        <div className="border p-10"></div>
                        <div className="border p-10"></div>
                    </div>
                </div>
            </div>
        </main>
    )
}
