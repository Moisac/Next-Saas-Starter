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
import { Loader2 } from "lucide-react"
import { Google } from "../common/icons"
import { toast } from "sonner"


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
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmitEmail(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      toast.error('Something went wrong.', {
        description: 'Your sign in request failed. Please try again.',
      })
    }

    toast.info('Check your email', {
      description: 'We sent you a login link. Be sure to check your spam too.',
    })
  }

  async function onSubmitGoogle() {
    setIsGoogleLoading(true)

    const signInResult = await signIn("google", {
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    })

    setIsGoogleLoading(false)

    if (!signInResult?.ok) {
      toast.error('Something went wrong.', {
        description: 'Your sign in request failed. Please try again.',
      })
    }

    toast.success('Account successfully created', {
      description: 'Your account was created using your Google account',
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
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
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            {type === "register"
              ? "Sign Up with Email"
              : "Sign In with Email"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
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