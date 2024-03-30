'use client'

import { updateUser } from "@/actions/user/update"
import { InputErrors } from "@/components/common/input-errors"
import { SubmitButton } from "@/components/common/submit-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { userUpdateSchema } from "@/lib/validations/user"
import { User } from "@/types/user"
import { useState } from "react"
import { toast } from "sonner"

interface IUpdateUser {
    user: User
}
  
  export function UpdateUser({ user }: IUpdateUser) {
    const [formState, setFormState] = useState<{validation?: { name?: string[] }}>({})

    const updateUserWithId = updateUser.bind(null, user?.id)
    
    const clientFormAction = async (formData: FormData) => {
        const validatedFields = userUpdateSchema.safeParse(Object.fromEntries(formData))

        if (!validatedFields.success) {
            setFormState({ validation: validatedFields.error.flatten().fieldErrors })
        } else {
            setFormState({})
        }

      if(validatedFields.success) {
        const response = await updateUserWithId(user?.id, formData)

        if(response?.error) {
            toast.error(response?.error)
        }

        if(response?.success) {
            toast.success(response?.success)
        }
      }
    }

    return (
       <div>
         <Card className="m-auto max-w-xl">
            <CardHeader>
                <CardTitle>Edit account</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={clientFormAction}>
                    <div className="grid gap-5">
                        {/* Email input */}
                        <div className="grid gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                defaultValue={user?.email ?? ''}
                                disabled={true}
                            />
                        </div>

                            {/* Name input */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Your username"
                                defaultValue={user?.name ?? ''}
                                disabled={false}
                            />
                            <InputErrors inputErrors={formState?.validation?.name}/>
                        </div>
                        <SubmitButton>Save changes</SubmitButton>
                    </div>
                </form>
            </CardContent>
        </Card>
       </div>
    )
  }