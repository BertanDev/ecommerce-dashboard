'use client'

import { CategoryStore, useCategoryStore } from '@/stores/categoryStore'
import { PenSquare } from 'lucide-react'

interface EditCategoryButtonProps {
  id: number
  name: string
  description: string
}

export function EditCategoryButton({
  id,
  description,
  name,
}: EditCategoryButtonProps) {
  const { setDescription, setName, setCreateMode, setId } =
    useCategoryStore() as CategoryStore

  function attStates() {
    setDescription(description)
    setName(name)
    setCreateMode(false)
    setId(id)
  }

  return (
    <button onClick={attStates}>
      <PenSquare className="text-blue-400 mt-[6px] ml-24 cursor-pointer" />
    </button>
  )
}
