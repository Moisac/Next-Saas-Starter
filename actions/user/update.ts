'use server'

import prisma from "@/lib/db"
import { getLoggedUser } from "@/lib/queries/user";
import { userUpdateSchema } from "@/lib/validations/user"
import { revalidatePath } from "next/cache";

export const updateUser = async (userId: string, prevState: unknown, formData: FormData) => {
    const user = await getLoggedUser();

    if(!user?.id || user?.id !== userId) {
        return { error: 'Unauthorized request' }
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
            where: { id: user?.id },
            data: { name: validatedFields?.data?.name },
        });

        if(response.email) {
            return { success: 'User successfully updated' }
        }
    } catch (error) {
        return { error: 'User could not be updated.' }
    }

    revalidatePath('/dashboard/account')
}