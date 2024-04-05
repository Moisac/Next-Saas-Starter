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

  
export type Invoice = {
  id: string;
  customer_email: string,
  customer_name: string,
  amount_due: string;
  amount_paid: string,
  collection_method: string,
  status: string;
  created: Date,
  paid_at: Date,
  invoice_url: string,
  invoice_pdf: string,
}