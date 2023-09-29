'use client'

import { api } from '@/lib/axios'
import { PlanStore, usePlanStore } from '@/stores/planStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarClock, Wallet } from 'lucide-react'
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const planCreateFormSchema = z.object({
  name: z.string().nonempty('Informe um nome para o plane'),
  description: z.string().nonempty('Informe a descrição do plano'),
  duration: z.number().min(1),
  price: z.number(),
})

type PlanCreateFormData = z.infer<typeof planCreateFormSchema>

export function CreatePlanSection() {
  const [durationTimeForm, setDurationTimeForm] = useState<string>()

  const {
    description,
    durationDays,
    isCreateMode,
    name,
    price,
    id,
    setCreateMode,
    setDescription,
    setDurationInDays,
    setId,
    setName,
    setPrice,
  } = usePlanStore() as PlanStore

  const planCreateForm = useForm<PlanCreateFormData>({
    resolver: zodResolver(planCreateFormSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = planCreateForm

  useEffect(() => {
    setDurationTimeForm('days')
    setValue('description', description)
    setValue('duration', durationDays)
    setValue('price', price)
    setValue('name', name)
  }, [description, durationDays, price, name, setValue, isCreateMode])

  async function onSubmit(data: PlanCreateFormData) {
    let convertedDays

    switch (durationTimeForm) {
      case 'days':
        convertedDays = data.duration
        break

      case 'months':
        convertedDays = data.duration * 30
        break

      case 'years':
        convertedDays = data.duration * 365
        break
      default:
        break
    }

    if (isCreateMode) {
      try {
        const response = await api.post('/subscription-plan/create', {
          name: data.name,
          description: data.description,
          price: data.price,
          duration_days: convertedDays,
        })

        console.log(response)

        toast.success('Plano criado com sucesso!')

        setValue('description', '')
        setValue('name', '')
        window.location.reload()
      } catch {
        toast.error('Algo deu errado!')
      }
    } else {
      try {
        const response = await api.post('/subscription-plan/update', {
          id,
          name: data.name,
          description: data.description,
          price: data.price,
          duration_days: convertedDays,
        })

        toast.success('Plano editado com sucesso!')

        setValue('description', '')
        setValue('name', '')
        setValue('duration', 0)
        setValue('price', 0)
        window.location.reload()
      } catch {
        toast.error('Algo deu errado!')
      } finally {
        window.location.reload()
        setValue('description', '')
        setValue('name', '')
        setCreateMode(true)
        setDescription('')
        setDurationInDays(null)
        setPrice(null)
        setId(null)
        setName('')
      }
    }
  }

  function handleCancelEdit() {
    setCreateMode(true)
    setDescription('')
    setName('')
    setPrice(null)
    setDurationInDays(null)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        id="description"
        rows={3}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-4"
        defaultValue={''}
        placeholder="plan description..."
        {...register('description')}
      />

      <div className="mt-6">
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium leading-6 text-gray-600"
          >
            Duration
          </label>
          <div className="relative mt-2 rounded-md shadow-sm w-2/4">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">
                <CalendarClock className="text-indigo-300" />
              </span>
            </div>
            <input
              type="number"
              id="duration"
              className="block w-full rounded-md border-0 py-1.5 pl-12 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0"
              {...register('duration', { valueAsNumber: true })}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="time" className="sr-only">
                time
              </label>
              <select
                id="time"
                name="time"
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setDurationTimeForm(e.target.value)
                }
              >
                <option value={'days'}>days</option>
                <option value={'months'}>months</option>
                <option value={'years'}>years</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-600"
            >
              Price
            </label>
            <div className="relative mt-2 rounded-md shadow-sm w-2/4">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">
                  <Wallet className="text-indigo-300" />
                </span>
              </div>
              <input
                type="number"
                pattern="^\d+(,\d{1,2})?$"
                step={0.01}
                id="price"
                className="block w-full rounded-md border-0 py-1.5 pl-12  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.0"
                {...register('price', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-6">
        <div className="p-2 rounded border-[1px] border-indigo-400 flex">
          <input
            type="text"
            id="name"
            className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="name"
            {...register('name')}
          />
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
          >
            {isCreateMode ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
      <div className="flex justify-end pt-2">
        {!isCreateMode && (
          <button
            className="inline-flex w-9 min-w-[40px] justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
