'use server'

import prisma from "@/lib/db"
import { getLoggedUser } from "@/lib/queries/user";
import { userUpdateByAdminSchema } from "@/lib/validations/user"
import { Role } from "@/types/user";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateUserByAdmin = async (userId: string, prevState: unknown, formData: FormData) => {
    const user = await getLoggedUser();

    if(user?.role !== Role.ADMIN) {
        return { error: 'Unauthorized request' }
    }

    const rawFormData = {
        name: formData.get('name'),
        email: formData.get('email'),
        isActive: !!formData.get('isActive')
    }

    const validatedFields = userUpdateByAdminSchema.safeParse(rawFormData)

    if (!validatedFields.success) {
        return { validation: validatedFields.error.flatten().fieldErrors }
    }
    
    if(user?.name === validatedFields?.data?.name) {
        return { error: 'New name value is the same with the previous name value' }
    }

    try {
        const response = await prisma.user.update({
            where: { id: userId },
            data: { 
                name: validatedFields?.data?.name,
                email: validatedFields?.data?.email,
                isActive: validatedFields?.data?.isActive
            },
        });

        revalidatePath('/dashboard/users')

        if(response.email) {
            return { success: 'User successfully updated' }
        }
    } catch (error) {
        return { error: 'User could not be updated.' }
    }

}