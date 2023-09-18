interface InputErrorProps {
  errors?: string
}

export function InputError({ errors }: InputErrorProps) {
  return (
    <div className="flex w-96">
      <p className="text-red-500 text-sm text-left">{errors}</p>
    </div>
  )
}
