'use client'

import { PlanStore, usePlanStore } from '@/stores/planStore'
import { PenSquare } from 'lucide-react'

interface EditPlanButtonProps {
  id: number
  name: string
  description: string
  durationDays: number
  price: number
}

export function EditPlanButton({
  id,
  description,
  name,
  durationDays,
  price,
}: EditPlanButtonProps) {
  const {
    setDescription,
    setName,
    setCreateMode,
    setId,
    setDurationInDays,
    setPrice,
  } = usePlanStore() as PlanStore

  function attStates() {
    setDescription(description)
    setName(name)
    setCreateMode(false)
    setDurationInDays(durationDays)
    setPrice(price)
    setId(id)
  }

  return (
    <button onClick={attStates}>
      <PenSquare className="text-blue-400 mt-[6px] ml-24 cursor-pointer" />
    </button>
  )
}
