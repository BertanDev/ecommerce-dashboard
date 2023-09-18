'use client'

import { PlusCircle } from 'lucide-react'
import { ModalStore, useModalStore } from '@/stores/modalStore'

export function OpenModalButton() {
  const { isOpen, setOpen } = useModalStore() as ModalStore

  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onClick={() => setOpen(!isOpen)}
    >
      <button className="text-green-600 text-lg">add</button>
      <PlusCircle className="text-green-600" />
    </div>
  )
}
