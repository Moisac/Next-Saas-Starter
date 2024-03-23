import Google from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

import type { NextAuthConfig } from "next-auth"
import { siteConfig } from "@/config/site"
import { getUserByEmail } from "@/lib/queries/user";
import MagicLinkEmail from "../emails/templates/magic-link-email"
import { resend } from "../emails/send-email";

export const authProviders: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    EmailProvider ({
      server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.RESEND_API_KEY,
            },
          },
          from: process.env.EMAIL_FROM,
    
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await getUserByEmail(identifier);
        if (!user || !user.name) return null;

        const userVerified = user?.emailVerified ? true : false;
        const authSubject = userVerified ? `Login link for ${siteConfig.name}` : `Activate ${siteConfig.name} your account`;

        try {
          const { data, error } = await resend.emails.send({
            from: `${siteConfig.name} <${process.env.EMAIL_FROM}>`,
            // to: process.env.NODE_ENV === "development" ? 'delivered@resend.dev' : identifier,
            to: identifier,
            subject: authSubject,
            react: MagicLinkEmail({
              firstName: user?.name as string,
              actionUrl: url,
              mailType: userVerified ? "login" : "register",
              siteName: siteConfig.name
            }),
            // Set this to prevent Gmail from threading emails.
            // More info: https://resend.com/changelog/custom-email-headers
            headers: {
              'X-Entity-Ref-ID': new Date().getTime() + "",
            },
          });

          if (error || !data) {
            throw new Error(error?.message)
          }

          // console.log(data)
        } catch (error) {
          throw new Error("Failed to send verification email.")
        }
      },
    }),
  ],
}