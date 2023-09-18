import { create } from 'zustand'

interface CategoryState {
  id: number
  name: string
  description: string
  isCreateMode: boolean
}

interface CategoryActions {
  setId: (id: number | null) => void
  setName: (name: string) => void
  setDescription: (description: string) => void
  setCreateMode: (isCreateMode: boolean) => void
}

export type CategoryStore = CategoryState & CategoryActions

export const useCategoryStore = create((set) => ({
  id: null,
  name: '',
  description: '',
  isCreateMode: true,
  setId: (id: number) => set({ id }),
  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  setCreateMode: (isCreateMode: boolean) => set({ isCreateMode }),
}))
