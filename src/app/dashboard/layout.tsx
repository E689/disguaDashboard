"use client";
import {Button} from "@/components/ui/button";
import {ThemeToggle} from "@/components/ThemeToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function UserAuthLayout({children}: { children: React.ReactNode }) {

    const [isShowed, setIsShowed] = useState(false);

    return (
        <main className="w-screen h-dvh overflow-y-scroll">
            {/** Separar layout del page */}
            <ThemeToggle/>
            <div className="flex w-full h-full">
                <nav
                    className={`absolute transform ${!isShowed ? '-translate-x-full' : 'translate-x-0' } md:translate-x-0 transition-transform duration-500 ease-in-out md:static bg-neutral-50 dark:bg-zinc-900 border shadow h-full max-w-[500px] w-1/3 min-w-[300px] p-5 flex flex-col gap-5`}>
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
            <div className="absolute md:hidden bottom-0 right-0 mr-10 mb-10">
                <Button onClick={() => {
                    setIsShowed(!isShowed)
                }} variant='secondary' className='rounded-full '>
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </Button>
            </div>
        </main>
    )
}