'use server'

import prisma from "@/lib/db"
import { getLoggedUser } from "@/lib/queries/user";
import { userUpdateSchema } from "@/lib/validations/user"
import { revalidatePath } from "next/cache";

export const updateUser = async (prevState: unknown, formData: FormData) => {
    const user = await getLoggedUser();

    if(!user?.email) {
        return { error: 'User doesn\'t exist' }
    }

    const validatedFields = userUpdateSchema.safeParse(Object.fromEntries(formData))

    if (!validatedFields.success) {
        return { validation: validatedFields.error.flatten().fieldErrors }
    }

    if('email' in validatedFields) {
        return { error: 'You can\'t change your email' }
    }

    if(user?.name === validatedFields?.data?.name) {
        return { error: 'New name value is the same with the previous name value' }
    }

    try {
        const response = await prisma.user.update({
            where: { email: user?.email },
            data: { name: validatedFields?.data?.name, email: 'moisaclaudiu2309@gmail.com' },
        });

        if(response.email) {
            return { success: true }
        }
    } catch (error) {
        return { error: 'User could not be updated.' }
    }

    revalidatePath('/dashboard/account')
}