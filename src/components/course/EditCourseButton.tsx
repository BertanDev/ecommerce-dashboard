'use client'

import { CourseStore, useCourseStore } from '@/stores/courseStore'
import { ModalStore, useModalStore } from '@/stores/modalStore'
import { PenSquare } from 'lucide-react'

interface EditCourseButtonProps {
  categoryId: number
  planId: number
  description: string
  name: string
  price: number
  id: number
}

export default function EditCourseButton({
  categoryId,
  description,
  name,
  planId,
  price,
  id,
}: EditCourseButtonProps) {
  const {
    setCategoryId,
    setCreateMode,
    setDescription,
    setName,
    setId,
    setPrice,
    setSubscriptionPlanId,
  } = useCourseStore() as CourseStore

  const { setOpen } = useModalStore() as ModalStore

  function attStatus() {
    setOpen(true)
    setCategoryId(categoryId)
    setDescription(description)
    setName(name)
    setSubscriptionPlanId(planId)
    setPrice(price)
    setId(id)
    setCreateMode(false)
  }

  return (
    <button onClick={attStatus}>
      <PenSquare className="text-blue-400 mt-[6px] ml-24 cursor-pointer" />
    </button>
  )
}
