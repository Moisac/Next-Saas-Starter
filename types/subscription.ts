import { User } from "@prisma/client"

export type SubscriptionPlan = {
    title: string;
    description: string;
    benefits: string[];
    limitations: string[];
    prices: {
      monthly: number;
      yearly: number;
    };
    stripeIds: {
      monthly: string | null;
      yearly: string | null;
    };
  }
  
  export type UserSubscriptionPlan = SubscriptionPlan &
    Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
      stripeCurrentPeriodEnd: number
      isPaid: boolean
      interval: "month" | "year" | null
      isCanceled?: boolean
    }