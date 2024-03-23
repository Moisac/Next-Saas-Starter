"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Rocket } from "lucide-react"
import { Google } from "../common/icons"
import { toast } from "sonner"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"


interface UserAuthProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string
}

type FormData = z.infer<typeof userAuthSchema>

export async function UserAuth({ className, type, ...props }: UserAuthProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isMagicLinkSend, setIsMagicLinkSend] = useState<boolean>(false)

  const searchParams = useSearchParams()

  async function onSubmitEmail(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || DEFAULT_LOGIN_REDIRECT,
    })

    setIsLoading(false)

    if (signInResult && !signInResult?.ok) {
      toast.error('Something went wrong.', {
        description: 'Your sign in request failed. Please try again.',
      })
    }

    if(signInResult?.ok) {
      setIsMagicLinkSend(true)
    }
  }

  async function onSubmitGoogle() {
    setIsGoogleLoading(true)

    const signInResult = await signIn("google", {
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    })

    setIsGoogleLoading(false)

    if (signInResult && !signInResult?.ok) {
      toast.error('Something went wrong.', {
        description: `Your ${type === 'register' ? 'sign up' : 'login'} request failed. Please try again.`,
      })
    }

    toast.success(`${type === 'register' ? 'Account successfully created' : 'Successfully logged in'}`, {
      description: `${type === 'register' ? 'Your account was created using your Google account' : 'Successfully logged in using your Google account'}`,
    })
  }

  return (
    // TODO: Fix display: none added on form when click login or login with google
    <div className={cn("grid gap-6", className)} {...props}>
      { isMagicLinkSend ?  
        (
          <Alert variant='info'>
            <Rocket className="h-4 w-4" />
            <AlertTitle>Check your email!</AlertTitle>
            <AlertDescription>
              {`We sent you a ${type === 'register' ? 'registration' : 'login'} link. Be sure to check your spam too.`}
            </AlertDescription>
          </Alert>

        )
        : null
      }
      <form onSubmit={handleSubmit(onSubmitEmail)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading || isMagicLinkSend}>
            {isLoading && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            {type === "register"
              ? "Sign Up with Email"
              : "Login with Email"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or login with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={onSubmitGoogle}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <Google className="mr-2 size-4"/>
        )}{" "}
        Google
      </button>
    </div>
  )
}