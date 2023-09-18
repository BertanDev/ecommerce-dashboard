interface ProgressbarProps {
  value: number
}

export function Progressbar({ value }: ProgressbarProps) {
  return (
    <div className="bg-gray-200 w-full h-2 rounded-sm">
      <div
        className={`bg-indigo-400 h-full rounded-lg`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  )
}
