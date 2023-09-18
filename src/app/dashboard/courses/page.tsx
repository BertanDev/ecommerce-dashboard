import AddCourseModal from '@/components/course/AddCourseModal'
import { CourseCard } from '@/components/course/CourseCard'
import { OpenModalButton } from '@/components/course/OpenModalButton'
import { api } from '@/lib/axios'
import { cookies } from 'next/headers'

type Course = {
  user_system_id: string
  category_id: string
  subscription_plan_id: string
  id: number
  name: string
  description: string
  price: number
  url: string
  created_at: {
    date: string
    timezone_type: number
    timezone: string
  }
  updated_at: null | string
  deleted_at: null | string
}

export default async function Courses() {
  const cookieStore = cookies()

  const token = cookieStore.get('auth_token')?.value

  const response = await api.get('/product/get-all', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  const courses = response.data

  const flattenedData = courses.categories.flat()

  return (
    <>
      <main className="w-full p-12 h-screen bg-gray-100">
        <div className="flex justify-between w-full px-4">
          <span className="text-2xl text-gray-600 font-semibold">Courses</span>
          <div className="flex items-center">
            <OpenModalButton />
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-500 bg-gradient-to-r from-indigo-500 to-gray-400 mt-6" />
        <div className="bg-gray-100 overflow-y-auto p-12">
          <div className="flex flex-wrap max-w-screen-xl mx-auto gap-6 justify-center items-center">
            {flattenedData.map((course: Course) => {
              return (
                <CourseCard
                  key={course.id}
                  categoryId={Number(course.category_id)}
                  description={course.description}
                  name={course.name}
                  id={course.id}
                  price={course.price}
                  subscriptionPlanId={Number(course.subscription_plan_id)}
                />
              )
            })}
          </div>
        </div>
      </main>
      <AddCourseModal />
    </>
  )
}
