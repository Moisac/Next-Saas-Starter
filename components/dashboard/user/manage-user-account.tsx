'use client'

import { updateUserByAdmin } from "@/actions/admin/update-user";
import { InputErrors } from "@/components/common/input-errors";
import { SubmitButton } from "@/components/common/submit-button";
import { DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { userUpdateByAdminSchema } from "@/lib/validations/user";
import { User } from "@/types/user";
import { useState } from "react";
import { toast } from "sonner";

interface IUpdateUserAccount {
    selectedUser: User
    setSelectedUser: (user: User | null) => void
}

export function ManageUserAccount({ selectedUser, setSelectedUser }: IUpdateUserAccount) {
    const [formState, setFormState] = useState<{validation?: { name?: string[], email?: string[] }}>({})
    const [activeAccount, setActiveAccount] = useState<boolean>(selectedUser?.isActive)

    const updateUserWithId = updateUserByAdmin.bind(null, selectedUser?.id)

    const clientFormAction = async (formData: FormData) => {

        const rawFormData = {
            name: formData.get('name'),
            email: formData.get('email'),
            isActive: !!formData.get('isActive')
        }

        const validatedFields = userUpdateByAdminSchema.safeParse(rawFormData)

        if (!validatedFields.success) {
            setFormState({ validation: validatedFields.error.flatten().fieldErrors })
        } else {
            setSelectedUser(null)
            setFormState({})
        }

      if(validatedFields.success) {
        const response = await updateUserWithId(selectedUser?.id, formData)

        if(response?.error) {
            toast.error(response?.error)
        }

        if(response?.success) {
            toast.success(response?.success)
        }
      }
    }

    return (
        <DialogDescription>
             <form action={clientFormAction}>
                <div className="flex gap-3 items-center pb-3">
                    <Label htmlFor="isActive">{activeAccount ? 'Deactivate' : 'Activate'} user account:</Label>
                    <Switch
                        defaultChecked={activeAccount}
                        checked={activeAccount}
                        onCheckedChange={() => setActiveAccount(!activeAccount)}
                        id="isActive" name="isActive"
                    />
                    {/* <input id="isActive" name="isActive" type="checkbox" checked={activeAccount} hidden /> */}
                </div>
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
                            defaultValue={selectedUser?.email ?? ''}
                        />
                        <InputErrors inputErrors={formState?.validation?.email}/>
                    </div>

                    {/* Name input */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Your username"
                            defaultValue={selectedUser?.name ?? ''}
                        />
                        <InputErrors inputErrors={formState?.validation?.name}/>
                    </div>
                    <SubmitButton>Update user</SubmitButton>
                </div>
            </form>
        </DialogDescription>
    )
}