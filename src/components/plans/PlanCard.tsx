import { formatDate } from '@/utils/formatDate'
import { EditPlanButton } from './EditPlanButton'

interface PlanCardProps {
  id: number
  name: string
  description: string
  price: number
  durationDays: number
  createdAt: string
}

export default function PlanCard({
  createdAt,
  description,
  name,
  price,
  durationDays,
  id,
}: PlanCardProps) {
  const formattedDate = formatDate(createdAt)

  return (
    <div className="flex bg-white rounded w-full flex-col gap-2 p-4">
      <div className="w-full flex justify-between">
        <span className="text-indigo-400 font-semibold text-lg">{name}</span>
        <span className="text-gray-600 text-sm">456 subscribers</span>
        <span className="text-gray-600 text-sm">12 courses</span>
      </div>
      <div className="mt-2">
        <p>{description}</p>
      </div>
      <div className="mt-4 flex w-full justify-between">
        <span className="text-gray-400 font-semibold text-sm">
          Plan created at {formattedDate}
        </span>
        <EditPlanButton
          description={description}
          durationDays={durationDays}
          id={id}
          name={name}
          price={price}
        />
      </div>
    </div>
  )
}
