import { create } from 'zustand'

interface PlanState {
  id: number
  name: string
  description: string
  durationDays: number
  price: number
  isCreateMode: boolean
}

interface PlanActions {
  setId: (id: number | null) => void
  setName: (name: string) => void
  setDescription: (description: string) => void
  setDurationInDays: (duration_days: number | null) => void
  setPrice: (price: number | null) => void
  setCreateMode: (isCreateMode: boolean) => void
}

export type PlanStore = PlanState & PlanActions

export const usePlanStore = create((set) => ({
  id: null,
  name: null,
  description: null,
  durationDays: null,
  price: null,
  isCreateMode: true,
  setId: (id: number | null) => set({ id }),
  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  setDurationInDays: (durationDays: number | null) => set({ durationDays }),
  setPrice: (price: number | null) => set({ price }),
  setCreateMode: (isCreateMode: boolean) => set({ isCreateMode }),
}))
