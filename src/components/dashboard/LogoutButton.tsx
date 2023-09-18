'use client'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const router = useRouter()

  function handleLogout() {
    Cookies.remove('auth_token')

    router.push('/')
  }

  return (
    <div
      onClick={handleLogout}
      className="absolute left-4 bottom-4 flex text-red-400 gap-2 cursor-pointer"
    >
      <LogOut className="rotate-180" />
      <span>logout</span>
    </div>
  )
}
