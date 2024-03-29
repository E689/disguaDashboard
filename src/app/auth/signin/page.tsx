'use client'

import React from 'react'
import { signIn } from 'next-auth/react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ThemeToggle";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50)
})

function SignIn() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "dev@dev.com",
      password: "1234"
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "/dashboard"
    })
  }

  return (
    <div className='w-screen h-dvh flex'>
      <ThemeToggle />
      <div className='m-auto dark:bg-neutral-900 bg-white md:border shadow rounded-lg md:p-10 py-10 flex flex-col gap-5' suppressHydrationWarning={true}>
        <div className="flex flex-col gap-3 items-center">
          <h3 className="text-3xl font-bold text-center ">Login</h3>
          <p className="text-muted-foreground max-w-[25ch] text-center">Ingresa tus credenciales en el formulario de abajo</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 flex flex-col gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Correo electronico</FormLabel>
                  <FormControl>
                    <Input placeholder="correo@electronico.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este es el correo del usuario.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Contraseña</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Contraseña
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Iniciar Sesión</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SignIn