"use client"

import { SubscriptionPlan, UserSubscriptionPlan } from '@/types/subscription';
import { SubmitButton } from '../common/submit-button'
import { Button } from '../ui/button';
import Link from 'next/link';
import { generateUserStripe } from '@/actions/subscription/generate-user-stripe';

interface BillingFormButtonProps {
    offer: SubscriptionPlan;
    subscriptionPlan: UserSubscriptionPlan;
    year: boolean;
}

export function SubscriptionPlanAction({ year, offer, subscriptionPlan }: BillingFormButtonProps) {

  const generateUserStripeSession = generateUserStripe.bind(
    null,
    offer.stripeIds[year ? "yearly" : "monthly"] ?? ''
  );

  return (
    offer.title === "Starter" ? (
        <Button asChild className='w-full'>
            <Link href="/dashboard">Go to dashboard</Link>
        </Button>
    ) : (
    <form action={generateUserStripeSession}>
        <SubmitButton>
            {subscriptionPlan.stripePriceId === offer.stripeIds[year ? "yearly" : "monthly"]
                ? "Manage Subscription" : "Upgrade"
            }
        </SubmitButton>
    </form>
    )
  )
}