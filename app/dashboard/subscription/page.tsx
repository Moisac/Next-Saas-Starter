import { redirect } from "next/navigation"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TriangleAlert } from "lucide-react"
import { BillingInfo } from "@/components/dashboard/subscription/billing-info"
import { getUserSubscriptionPlan } from "@/lib/queries/stripe/get-user-subscription"
import { getLoggedUser } from "@/lib/queries/user"

export const metadata = {
  title: "Subscription plan",
  description: "Manage subscription plan.",
}

export default async function SubscriptionPage() {
  const user = await getLoggedUser()

  if (!user && !user?.id) {
    redirect("/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  return (
      <div className="grid gap-8">
        <Alert variant="info" className="!pl-14">
            <TriangleAlert />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            SaaS Starter app is a demo app using a Stripe test environment. You can
            find a list of test card numbers on the{" "}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert>
        <BillingInfo
          subscriptionPlan={subscriptionPlan}
        />
      </div>
  )
}