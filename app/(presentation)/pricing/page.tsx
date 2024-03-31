import { getUserSubscriptionPlan } from "@/actions/subscription/get-user-subscription";
import { PricingCards } from "@/components/presentation/pricing-cards";
import { getLoggedUser } from "@/lib/queries/user";

export const metadata = {
    title: "Pricing",
  }

export default async function Pricing() {
  const user = await getLoggedUser()
  let subscriptionPlan;

  if (user && user?.id) {
    subscriptionPlan = await getUserSubscriptionPlan(user?.id)
  }

    return (
      <div className="flex w-full flex-col gap-16 py-8 md:py-8">
        <PricingCards userId={user?.id} subscriptionPlan={subscriptionPlan} />
      </div>
    );
  }

