import Google from "next-auth/providers/google"
import { siteConfig } from "@/config/site"
import { getUserByEmail } from "@/lib/queries/user";
import MagicLinkEmail from "./lib/emails/templates/magic-link-email"
import { resend } from "./lib/emails/send-email";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),

    // Custom provider for sending maginc links using Resend api
    // https://authjs.dev/guides/providers/email-http
    {
      id: 'magic-link',
      type: 'email',
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await getUserByEmail(identifier);

        const authSubject = user?.emailVerified ? `Login link for ${siteConfig.name}` : `Activate ${siteConfig.name} your account`;

        try {
          const { data, error } = await resend.emails.send({
            from: `${siteConfig.name} <${process.env.EMAIL_FROM}>`,
            // to: process.env.NODE_ENV === "development" ? 'delivered@resend.dev' : identifier,
            to: identifier,
            subject: authSubject,
            react: MagicLinkEmail({
              firstName: user?.name as string,
              actionUrl: url,
              mailType: user?.emailVerified ? "login" : "register",
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

        } catch (error) {
          throw new Error("Failed to send verification email.")
        }
      },
    },
  ],
}