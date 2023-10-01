'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SectionButtonProps {
  text: string
  url: string
}

export function SectionButton({ text, url }: SectionButtonProps) {
  const router = useRouter()

  // const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (router === `/dashboard/${url}`) {
  //     e.preventDefault()
  //   }
  // }

  return (
    <>
      <Link href={`/dashboard/${url}`}>
        <div
          className="p-4 bg-indigo-600 rounded-md"
          // onClick={handleClick}
        >
          <span className="text-white text-xl">{text}</span>
        </div>
      </Link>
    </>
  )
}
