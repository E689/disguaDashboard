// import { BellIcon, CheckIcon } from "@radix-ui/react-icons"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {BellIcon, CheckIcon} from "lucide-react";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {DatePicker} from "@/components/ui/date-picker";
// import { Switch } from "@/components/ui/switch"

const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
]

type CardProps = React.ComponentProps<typeof Card>


export default function NewMeeting() {
    return (
        <div className='flex flex-col justify-center items-center p-5 h-full gap-5'>
            <h2 className='text-3xl font-bold'>Maquina</h2>
            <div className="flex flex-col border">
                <Card className={cn("w-[380px]")}>
                    <CardHeader>
                        <CardTitle>Agregar Cita</CardTitle>
                        <CardDescription>Aqui puedes agregar citas</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Paciente</Label>
                                    <Input id="name" placeholder="Nombre del paciente"/>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="tel">Telefono</Label>
                                    <Input id="tel" placeholder="Telefono del paciente"/>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className='flex flex-col space-y-1.5'>
                                        <Label htmlFor="age">edad</Label>
                                        <Input id="age" placeholder="Edad del paciente"/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="gender">Sexo</Label>
                                        <Select>
                                            <SelectTrigger id="gender">
                                                <SelectValue placeholder="Select"/>
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="next">Masculino</SelectItem>
                                                <SelectItem value="sveltekit">Femenino</SelectItem>
                                                <SelectItem value="astro">Indiferente</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="schedule">horario</Label>
                                    <DatePicker className='w-full'></DatePicker>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className='mt-5'>
                        <Button className="w-full font-bold flex gap-3 items-center">
                            <CheckIcon/> <span>Agregar Cita</span>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
