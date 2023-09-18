'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/axios'
import { toast } from 'react-hot-toast'
import { CategoryStore, useCategoryStore } from '@/stores/categoryStore'
import { useEffect } from 'react'

const categoryCreateFormSchema = z.object({
  name: z.string().nonempty('Informe um nome para a categoria'),

  description: z.string().nonempty('Informe a descrição da categoria'),
})

type CategoryCreateFormData = z.infer<typeof categoryCreateFormSchema>

export function CreateCategorySection() {
  const {
    description,
    name,
    isCreateMode,
    setCreateMode,
    setDescription,
    setName,
    id,
    setId,
  } = useCategoryStore() as CategoryStore

  const categoryCreateForm = useForm<CategoryCreateFormData>({
    resolver: zodResolver(categoryCreateFormSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = categoryCreateForm

  useEffect(() => {
    setValue('description', description)
    setValue('name', name)
  }, [id, description, name, setValue, isCreateMode])

  async function onSubmit(data: CategoryCreateFormData) {
    if (isCreateMode) {
      try {
        const response = await api.post('/category/create', {
          name: data.name,
          description: data.description,
        })
        toast.success('Category created')
      } catch (error) {
        toast.error('Algo deu errado ')
      }
    } else {
      console.log('editando')
      try {
        const response = await api.post('/category/update', {
          id: String(id),
          name: data.name,
          description: data.description,
        })
        toast.success('Updated category')
      } catch (error) {
        toast.error('Algo deu errado ')
      } finally {
        setCreateMode(true)
        setValue('description', '')
        setValue('name', '')
        setDescription('')
        setName('')
        setId(null)
      }
    }
  }

  const handleCancelEdit = () => {
    setCreateMode(true)
    setDescription('')
    setName('')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        id="description"
        rows={3}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-4"
        defaultValue={''}
        placeholder="category description..."
        {...register('description')}
      />
      <p className="text-sm text-indigo-400 mt-2">
        Write a few sentences about courses for this category.
      </p>
      <div className="flex mt-6">
        <input
          id="name"
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="name"
          {...register('name')}
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="inline-flex w-9 min-w-[40px] justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
        >
          {isCreateMode ? 'Create' : 'Save'}
        </button>
      </div>
      <div className="flex justify-end pt-4">
        {!isCreateMode && (
          <button
            className="inline-flex w-9 min-w-[40px] justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={handleCancelEdit}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
