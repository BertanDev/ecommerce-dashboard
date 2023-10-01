'use client'

import { RevenueGraphic } from './RevenueGraphic'

export function RevenueAreaGraphic() {
  return (
    <div className="flex flex-col p-6 w-full">
      <div className="mb-8">
        <span className="text-xl text-gray-500 font-semibold">REVENUE</span>
      </div>
      <div className="w-full bg-gray-100 flex justify-around rounded-sm p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="">
            <p className="text-gray-400">Previous Week</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-gray-500 text-3xl">$33,771</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="">
            <p className="text-gray-400">Current Week</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span className="text-gray-500 text-3xl">$12,254</span>
          </div>
        </div>
      </div>
      <div className="mt-10">
        {typeof window !== 'undefined' ? <RevenueGraphic /> : ''}
      </div>
    </div>
  )
}
