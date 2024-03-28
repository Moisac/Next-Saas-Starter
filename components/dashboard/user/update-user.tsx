'use client'

import { updateUser } from "@/actions/user/update"
import { InputErrors } from "@/components/common/input-errors"
import { SubmitButton } from "@/components/common/submit-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/types/user"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"

interface IUpdateUser {
    user: User
}
  
  export function UpdateUser({ user }: IUpdateUser) {

    const [state, formAction] = useFormState(updateUser, undefined)

    useEffect(() => {
        if(state?.success) {
            toast.success('User successfully updated')
        }
    
        if(state?.error) {
            toast.error(state?.error)
        }
    }, [state])
    
    return (
       <div>
         <Card className="m-auto max-w-xl">
            <CardHeader>
                <CardTitle>Edit account</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
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
                            <InputErrors inputErrors={state?.validation?.name}/>
                        </div>
                        <SubmitButton>Save changes</SubmitButton>
                    </div>
                </form>
            </CardContent>
        </Card>
       </div>
    )
  }