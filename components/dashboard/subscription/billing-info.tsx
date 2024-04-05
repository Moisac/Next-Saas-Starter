"use client"

import * as React from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn, formatDate } from "@/lib/utils"
import Link from "next/link"
import { UserSubscriptionPlan } from "@/types/subscription"
import { SubmitButton } from "@/components/common/submit-button"
import { generateUserStripe } from "@/actions/subscription/generate-user-stripe"

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan;
}

export function BillingInfo({
  subscriptionPlan
}: BillingInfoProps) {

  return (
    <Card >
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          You are currently on the <strong className="text-emerald-600">{subscriptionPlan.title}</strong>{" "}
          plan.
        </CardDescription>
      </CardHeader>
      <CardContent>{subscriptionPlan.description}</CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
      { subscriptionPlan.isPaid ?
        (
          <form action={generateUserStripe}>
            <SubmitButton>
              Manage subscription
            </SubmitButton>
          </form>
        )
        :
        (
          <Button asChild>
             <Link
              href="/pricing"
            >
              Upgrade now
            </Link>
          </Button>
        )
      }

      {subscriptionPlan.isPaid ? (
        <p className={cn(
          "rounded-full text-sm font-medium py-1 px-2",
          subscriptionPlan.isCanceled ? "bg-red-200" : " bg-emerald-200"
        )}>
          {subscriptionPlan.isCanceled
            ? "Your plan will be canceled on "
            : "Your plan renews on "}
          <strong>{formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}</strong>.
        </p>
      ) : null}
      </CardFooter>
    </Card>
  )
}