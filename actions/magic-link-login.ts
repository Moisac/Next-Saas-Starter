'use server'

import { signIn } from "@/auth"
import { userAuthSchema } from "@/lib/validations/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const magicLinkLogin = async (formData: FormData, callbackUrl?: string) => {


  const validatedFields = userAuthSchema.safeParse({
    email: formData.get('email')
  })

  if (!validatedFields.success) {
    return { validation: validatedFields.error.flatten().fieldErrors }
  }

  try {
    await signIn("magic-link", {
      email: validatedFields?.data?.email?.toLowerCase(),
      redirect: false,
      callbackUrl: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
    })  

    return { success: true }
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}