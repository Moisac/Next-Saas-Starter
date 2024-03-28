
interface IInputErrors {
    inputErrors: string[] | undefined;
}

export function InputErrors({ inputErrors }: IInputErrors){
  return (
    inputErrors && (
        inputErrors?.map((error: string) => (
            <p className="px-1 text-xs text-red-600" key={error}>
                { error }
            </p>
        ))
    )
  )
}