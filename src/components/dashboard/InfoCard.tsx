import {
  Users2,
  BookCopy,
  ShoppingCart,
  Coins,
  ChevronUpCircle,
  ChevronDownCircle,
} from 'lucide-react'

interface InfoCardProps {
  title: string
  value: string
  percent: number
  upOrDown: 'up' | 'down'
}

export function InfoCard({ title, value, percent, upOrDown }: InfoCardProps) {
  return (
    <div className="flex flex-col bg-white p-4 w-72 rounded-sm">
      <div>
        <div className="flex w-full justify-between">
          <span className="text-gray-500">{title}</span>
          {title === 'Users' && (
            <Users2
              className="text-indigo-600 p-[10px] h-10 w-10 bg-indigo-200 rounded-sm mt-1 text-base"
              size={30}
            />
          )}
          {title === 'Courses' && (
            <BookCopy
              className="text-indigo-600 p-[10px] h-10 w-10 bg-indigo-200 rounded-sm mt-1 text-base"
              size={30}
            />
          )}
          {title === 'Orders' && (
            <ShoppingCart
              className="text-indigo-600 p-[10px] h-10 w-10 bg-indigo-200 rounded-sm mt-1 text-base"
              size={30}
            />
          )}

          {title === 'Revenue' && (
            <Coins
              className="text-indigo-600 p-[10px] h-10 w-10 bg-indigo-200 rounded-sm mt-1 text-base"
              size={30}
            />
          )}
        </div>
        <div className="mt-2">
          <span className="text-xl text-gray-600 font-semibold">{value}</span>
        </div>
      </div>
      <div className="flex mt-4 w-full gap-4">
        <div
          className={`flex  items-center gap-1 font-bold ${
            upOrDown === 'up' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {upOrDown === 'up' && <ChevronUpCircle size={14} />}
          {upOrDown === 'down' && <ChevronDownCircle size={14} />}
          <span className="text-sm">{percent}%</span>
        </div>
        <div className="flex">
          <p className="text-gray-400 text-sm font-semibold">
            Since last month
          </p>
        </div>
      </div>
    </div>
  )
}
