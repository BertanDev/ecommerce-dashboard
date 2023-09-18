import { create } from 'zustand'

interface CourseState {
  id: number
  name: string
  description: string
  price: number
  categoryId: number
  subscriptionPlanId: number
  isCreateMode: boolean
}

interface CourseActions {
  setId: (id: number | null) => void
  setName: (name: string) => void
  setDescription: (description: string) => void
  setPrice: (price: number) => void
  setCategoryId: (categoryId: number) => void
  setSubscriptionPlanId: (subscriptionPlanId: number) => void
  setCreateMode: (isCreateMode: boolean) => void
}

export type CourseStore = CourseState & CourseActions

export const useCourseStore = create((set) => ({
  id: null,
  name: '',
  description: '',
  price: null,
  categoryId: null,
  subscriptionPlanId: null,
  isCreateMode: true,
  setId: (id: number) => set({ id }),
  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  setCreateMode: (isCreateMode: boolean) => set({ isCreateMode }),
  setPrice: (price: number) => set({ price }),
  setCategoryId: (categoryId: number) => set({ categoryId }),
  setSubscriptionPlanId: (subscriptionPlanId: number) =>
    set({ subscriptionPlanId }),
}))
