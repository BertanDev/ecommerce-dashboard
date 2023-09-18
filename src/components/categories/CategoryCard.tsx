import { EditCategoryButton } from './EditCategoryButton'

interface CategoryCardProps {
  id: number
  name: string
  description: string
}

export default function CategoryCard({
  id,
  description,
  name,
}: CategoryCardProps) {
  return (
    <div className="flex flex-col p-4 bg-white rounded-md gap-2 w-full">
      <div className="flex justify-between">
        <span className="text-xl text-indigo-400 font-semibold">{name}</span>
        <span className="text-sm text-gray-400">32 courses</span>
      </div>
      <div>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex justify-end -mt-6">
        <EditCategoryButton description={description} name={name} id={id} />
      </div>
    </div>
  )
}
