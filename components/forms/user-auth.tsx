"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, MailWarning, Rocket } from "lucide-react"
import { Google } from "../common/icons"
import { toast } from "sonner"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { magicLinkLogin } from "@/actions/magic-link-login"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"


interface UserAuthProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string
}

type MagicLinkStatus = 'default' | 'success' | 'error'

type FormData = z.infer<typeof userAuthSchema>

export async function UserAuth({ className, type, ...props }: UserAuthProps) {

  const [isFormLoading, setIsFormLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [magicLinkFormStatus, setMagicLinkFormStatus] = useState<MagicLinkStatus>('default')
  const [validationErrors, setValidationErrors] = useState<string>()

  const searchParams = useSearchParams()

  const onSubmitEmail = async (formData: FormData) => {
    
    try {
      setIsFormLoading(true)
      const signInResult = await magicLinkLogin(formData, searchParams?.get("from"))

      if ((signInResult && signInResult?.error) || !signInResult) {
        setMagicLinkFormStatus('error')
      } else if(signInResult && signInResult?.validation) {
        setValidationErrors(signInResult?.validation?.email)
      } else {
        setMagicLinkFormStatus('success')
      }
    } catch (error) {
      setMagicLinkFormStatus('error')
    }
    finally {
      setIsFormLoading(false)
    }
  }

  async function onSubmitGoogle() {
   try {
    setIsGoogleLoading(true)

    const signInResult = await signIn("google", {
      redirect: false,
      callbackUrl: searchParams?.get("from") || DEFAULT_LOGIN_REDIRECT,
    })

    if ((signInResult && !signInResult?.ok) || !signInResult) {
      toast.error('Something went wrong.', {
        description: `Your ${type === 'register' ? 'sign up' : 'login'} request failed. Please try again.`,
      })
    } else {
      toast.success(`${type === 'register' ? 'Account successfully created' : 'Successfully logged in'}`, {
        description: `${type === 'register' ? 'Your account was created using your Google account' : 'Successfully logged in using your Google account'}`,
      })
    }

    
   } catch (error) {
    return error
   } finally {
    setIsGoogleLoading(false)
   }
  }

  const MagicLinkStatusAlert = () => {
    if(magicLinkFormStatus === 'success') {
      return (
        <Alert variant='info'>
        <Rocket className="h-4 w-4" />
        <AlertTitle>Check your email!</AlertTitle>
        <AlertDescription>
          {`We sent you a ${type === 'register' ? 'registration' : 'login'} link. Be sure to check your spam too.`}
        </AlertDescription>
      </Alert>
      )
    }

    if(magicLinkFormStatus === 'error') {
      return (
        <Alert variant='destructive'>
            <MailWarning className="h-4 w-4" />
            <AlertTitle>Something went wrong!</AlertTitle>
            <AlertDescription>
              {`${type === 'register' ? 'Registration' : 'Login'} link was not sent. Please try again later.`}
            </AlertDescription>
        </Alert>
      )
    }
  }

  return (
    // TODO: Fix display: none added on form when click login or login with google
    <div className={cn("grid gap-6", className)} {...props}>
      <MagicLinkStatusAlert />
      <form action={onSubmitEmail}>
        <div className="grid gap-2">
          <div className="grid gap-1">

            {/* Email input */}
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isFormLoading || isGoogleLoading || magicLinkFormStatus === 'success'}
            />
            {validationErrors && (
              <p className="px-1 text-xs text-red-600">
                {validationErrors}
              </p>
            )}
          </div>
          <button 
            type="submit" 
            className={cn(buttonVariants())} 
            disabled={isFormLoading || magicLinkFormStatus === 'success'}
          >
            {isFormLoading && (
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
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={onSubmitGoogle}
        disabled={isFormLoading || isGoogleLoading}
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