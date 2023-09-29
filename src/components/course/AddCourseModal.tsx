'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ModalStore, useModalStore } from '@/stores/modalStore'
import { BookCopy } from 'lucide-react'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { CourseStore, useCourseStore } from '@/stores/courseStore'

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

export default function AddCourseModal() {
  const [categories, setCategories] = useState<Category[]>([])
  const [plans, setPlans] = useState<Plan[]>([])

  const [category, setCategory] = useState<number | string>('empty')
  const [plan, setPlan] = useState<number | string>('empty')
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number | string>('empty')
  const [description, setDescription] = useState<string>('')

  const token = Cookies.get('auth_token')

  useEffect(() => {
    async function getData() {
      const categoriesResponse = await fetch(
        'http://www.vitorads.com.br/category/get-all',
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        },
      )

      const plansResponse = await fetch(
        'http://www.vitorads.com.br/subscription-plan/get-all',
        {
          method: 'GET',
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
        },
      )

      const categories = await categoriesResponse.json()
      const plans = await plansResponse.json()

      setCategories(
        categories.categories.reduce((acumulador: any, valorAtual: any) => {
          return acumulador.concat(valorAtual)
        }, []),
      )

      setPlans(() =>
        plans.subscriptionPlans.reduce((acumulador: any, valorAtual: any) => {
          return acumulador.concat(valorAtual)
        }, []),
      )
    }

    getData()
  }, [token])

  const { isOpen, setOpen } = useModalStore() as ModalStore

  const {
    categoryId,
    description: storeDescription,
    id,
    isCreateMode,
    name: storeName,
    price: storePrice,
    setCategoryId,
    setCreateMode,
    setDescription: setStoreDescription,
    setId,
    setName: setStoreName,
    setPrice: setStorePrice,
    setSubscriptionPlanId,
    subscriptionPlanId,
  } = useCourseStore() as CourseStore

  useEffect(() => {
    if (!isCreateMode) {
      console.log(
        storeName,
        storeDescription,
        storePrice,
        categoryId,
        subscriptionPlanId,
      )
      setName(storeName)
      setDescription(storeDescription)
      setPrice(storePrice)
      setCategory(categoryId)
      setPlan(subscriptionPlanId)
    } else {
      setName('')
      setDescription('')
      setPrice('empty')
      setCategory('empty')
      setPlan('empty')
    }
  }, [isCreateMode, storeName, id])

  function handleCancel() {
    setOpen(false)
    setCreateMode(true)
  }

  const cancelButtonRef = useRef(null)

  async function onSubmit() {
    if (
      name === '' ||
      description === '' ||
      price === 'empty' ||
      Number(price) <= 0 ||
      plan === 'empty'
    ) {
      toast.error('Preencha todos os campos')
      return
    }

    if (isCreateMode) {
      try {
        const response = await api.post('/product/create', {
          name,
          description,
          price,
          category_id: category,
          subscription_plan_id: plan,
          url: '<>',
        })

        toast.success('Curso criado!')
        window.location.reload()
        setOpen(false)
      } catch {
        toast.error('Algo deu errado')
      }
    } else {
      try {
        const url = 'http://vitorads.com.br/product/update'
        const headers = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }

        const data = {
          id: String(id),
          name,
          description,
          price: Number(price),
          url: '<>',
          category_id: categoryId,
          subscription_plan_id: Number(plan),
        }

        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        })

        toast.success('Editado com sucesso')
      } catch {
        toast.error('Algo deu errado!')
      } finally {
        setOpen(false)
        window.location.reload()
      }
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <BookCopy
                        className="h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Create a new course
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please provide all the course information with great
                          care.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="flex p-4 flex-col gap-6">
                  {/** Name Input */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        type="text"
                        value={name}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className="h-1 mt-1">
                        {/* <InputError errors={errors.email?.message} /> */}
                      </div>
                    </div>
                  </div>

                  {/** Description text area */}
                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        rows={3}
                        value={description}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about this course.
                    </p>
                  </div>

                  {/** Price and plan */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price | Plan
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        step={0.01}
                        id="price"
                        value={price}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="plan" className="sr-only">
                          Plan
                        </label>
                        <select
                          id="plan"
                          name="plan"
                          value={plan}
                          className="h-full w-48 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                          onChange={(e) => setPlan(e.target.value)}
                        >
                          <option value="empty">Selecione um plano</option>
                          {plans.map((plan) => {
                            return (
                              <option value={plan.id} key={plan.id}>
                                {plan.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="empty">Selecione uma categoria</option>
                      {categories.map((category) => {
                        return (
                          <option value={category.id} key={category.id}>
                            {category.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </form>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={onSubmit}
                  >
                    {isCreateMode ? 'Create' : 'Save'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleCancel}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
