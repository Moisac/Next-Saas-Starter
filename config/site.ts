import { SiteConfig } from "@/types/config"

const site_url = process.env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Next.js SaaS Starter",
  description:
    "Saas starter project created with Next.js 14, authentication, subscription and dashboard included.",
  url: site_url ?? '',
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
  mailSupport: "support@next-saas-starter.com"
}