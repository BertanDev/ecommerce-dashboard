import { BookCopy } from 'lucide-react'
import EditCourseButton from './EditCourseButton'
import { api } from '@/lib/axios'
import { cookies } from 'next/headers'

interface CourseCardProps {
  name: string
  description: string
  id: number
  categoryId: number
  subscriptionPlanId: number
  price: number
}

export async function CourseCard({
  categoryId,
  description,
  id,
  name,
  price,
  subscriptionPlanId,
}: CourseCardProps) {
  const cookieStore = cookies()

  const token = cookieStore.get('auth_token')?.value

  console.log(categoryId)

  const responseCategory = await api.get(`/category/find-one`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: categoryId,
    },
  })

  const categoryName = responseCategory.data.category.name

  return (
    <div className="flex flex-col bg-white p-4 rounded shadow">
      <div className="w-full flex gap-3">
        <div className="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-12 sm:w-12">
          <BookCopy className="h-8 w-8 text-indigo-600" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg text-gray-900 font-semibold">{name}</p>
          <span className="text-sm text-gray-500">163 members</span>
        </div>
        <EditCourseButton
          categoryId={categoryId}
          description={description}
          id={id}
          name={name}
          planId={subscriptionPlanId}
          price={price}
        />
      </div>
      <div className="h-[1px] bg-gray-200 mt-6" />
      <div className="text-gray-600 text-sm mt-4 w-[410px] px-2">
        {description}
      </div>
      <div className="flex mt-4 items-center gap-2 px-2">
        <span className="text-xs text-gray-600 font-light">category</span>
        <div className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">
          #{categoryName}
        </div>
      </div>
    </div>
  )
}
