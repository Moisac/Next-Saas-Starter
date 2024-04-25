export type User = {
    id: string;
    email: string;
    name: string;
    image?: string;
    role: Role;
    isActive: boolean;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
    stripePriceId: string | null;
    stripeCurrentPeriodEnd: Date | null;
    stripeSubscriptionId: string | null;
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }