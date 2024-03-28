import { RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

interface ISubmitButton {
    children: React.ReactNode;
}

export function SubmitButton({ children }: ISubmitButton){
    const { pending } = useFormStatus();
    
  return (
    <Button type="submit" disabled={pending}>
        { pending ?  
            <><RotateCw className="mr-2 h-4 w-4 animate-spin" /> Please wait...</> 
            : children
        }
    </Button>
  )
}