import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
}

interface ModalActions {
  setOpen: (isOpen: boolean) => void
}

export type ModalStore = ModalState & ModalActions

export const useModalStore = create((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
}))
