import CategoryCard from '@/components/categories/CategoryCard'
import { CreateCategorySection } from '@/components/categories/CreateCategorySection'
import { cookies } from 'next/headers'

type Category = {
  user_system_id: string
  id: number
  name: string
  description: string
  created_at: {
    date: string
    timezone_type: number
    timezone: string
  }
  updated_at: null | string
  deleted_at: null | string
}

export default async function Categories() {
  const cookieStore = cookies()

  const token = cookieStore.get('auth_token')?.value

  const response = await fetch('http://www.vitorads.com.br/category/get-all', {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  })

  const categories = await response.json()

  const flattenedData = categories.categories.flat()

  return (
    <main className="w-full p-12 h-screen bg-gray-100">
      <div className="flex justify-between w-full px-4">
        <span className="text-2xl text-gray-600 font-semibold">Categories</span>
        <div className="flex items-center"></div>
      </div>
      <div className="h-[1px] w-full bg-gray-500 bg-gradient-to-r from-indigo-500 to-gray-400 mt-6" />
      <div className="flex">
        <div className="flex flex-wrap max-w-screen-xl gap-6 w-8/12 mt-8">
          {flattenedData.map((category: Category) => {
            return (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
              />
            )
          })}
        </div>
        <div className="p-6 w-1/3">
          <div className="mt-2 w-full bg-white p-4 rounded flex flex-col">
            <div className="flex">
              <span className="text-gray-600">Create a new Category</span>
            </div>
            <CreateCategorySection />
          </div>
        </div>
      </div>
    </main>
  )
}
