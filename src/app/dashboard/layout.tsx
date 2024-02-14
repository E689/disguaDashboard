"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/dashboard/_components/header";

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShowed, setIsShowed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const machines = [
    { name: "Densitometria", id: 1 },
    { name: "Radiografía 1", id: 2 },
    { name: "Radiografía 2", id: 3 },
    { name: "Ultrasonido", id: 4 },
    { name: "Mamografía", id: 5 },
    { name: "Tomografía", id: 6 },
  ];

  useEffect(() => {
    setIsShowed(false);
  }, [pathname]);

  return (
    <main className="w-screen h-dvh overflow-y-scroll">
      {/** Separar layout del page */}
      <ThemeToggle />
      <div className="flex w-full h-full">
        <nav
          className={`absolute z-10 transform ${!isShowed ? "-translate-x-full" : "translate-x-0"} md:translate-x-0 transition-transform duration-500 ease-in-out md:static bg-neutral-50 dark:bg-zinc-900 border shadow h-full max-w-[500px] w-4/5 md:w-1/3 min-w-[300px] p-5 flex flex-col gap-5`}
        >
          <h2 className="text-3xl text-center">Maquinas</h2>
          <div className="flex flex-col gap-2">
            {machines.map((machine, index) => {
              return (
                <Link
                  href={`/dashboard/${machine.name.toLowerCase().replaceAll(" ", "-")}`}
                  key={index}
                  className={`${buttonVariants({ variant: "default" })} cursor-pointer`}
                >
                  {machine.name}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="w-full flex flex-col h-full">
          <Header></Header>
          {children}
        </div>
      </div>
      <div className="absolute md:hidden text-3xl bottom-0 right-0 mr-8 mb-8 z-40">
        <Button
          onClick={() => {
            setIsShowed(!isShowed);
          }}
          variant="secondary"
          className="rounded-full opacity-1 text-3xl w-[70px] h-[70px]"
        >
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </Button>
      </div>
    </main>
  );
}
