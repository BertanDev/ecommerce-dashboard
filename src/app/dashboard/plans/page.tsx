import { CreatePlanSection } from '@/components/plans/CreatePlanSection'
import PlanCard from '@/components/plans/PlanCard'
import { cookies } from 'next/headers'
import { api } from '@/lib/axios'

type Plan = {
  user_system_id: string
  id: number
  name: string
  description: string
  price: number
  duration_days: number
  created_at: {
    date: string
    timezone_type: number
    timezone: string
  }
  updated_at: null | string
  deleted_at: null | string
}

export default async function Plans() {
  const cookieStore = cookies()

  const token = cookieStore.get('auth_token')?.value

  const response = await api.get('/subscription-plan/get-all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const plans = response.data

  const flattenedData = plans.subscriptionPlans.flat()

  return (
    <main className="w-full p-12 h-screen bg-gray-100">
      <div className="flex justify-between w-full px-4">
        <span className="text-2xl text-gray-600 font-semibold">Plans</span>
      </div>
      <div className="h-[1px] w-full bg-gray-500 bg-gradient-to-r from-indigo-500 to-gray-400 mt-6" />
      <div className="flex w-full">
        <div className="w-1/3 mt-8">
          <div className="bg-white rounded p-4">
            <span className="text-gray-500 font-semibold">
              Create a new plan!
            </span>
            <CreatePlanSection />
          </div>
        </div>
        <div className="px-6 mt-8 w-full flex flex-col gap-4">
          {flattenedData.map((plan: Plan) => {
            return (
              <PlanCard
                key={plan.id}
                createdAt={plan.created_at.date}
                name={plan.name}
                description={plan.description}
                price={plan.price}
                durationDays={plan.duration_days}
                id={plan.id}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}
