import { Metadata } from "next"
import Link from "next/link"

import { UserAuth } from "@/components/forms/user-auth"
import { Suspense } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Button variant="outline" size="sm" asChild>
        <Link
          href="/"
          className={"absolute left-4 top-4 md:left-8 md:top-8"}
        >
          <>
            <ChevronLeft className="mr-2 size-4" />
            Back
          </>
        </Link>
      </Button>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <Suspense>
          <UserAuth />
        </Suspense>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}