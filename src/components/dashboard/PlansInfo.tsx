import { Medal } from 'lucide-react'
import { Progressbar } from './Progressbar'

export function PlansInfo() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-gray-600 font-semibold text-lg">Active plans</p>
      </div>
      <div className="flex gap-8 mt-2 mb-2">
        <div className="flex flex-col items-center bg-gray-100 rounded-sm p-2">
          <span>Silver plan</span>
          <Medal className="text-slate-600 p-[10px] h-10 w-10 bg-slate-200 rounded-sm mt-1 text-base" />
          <span className="font-semibold text-xl mt-2">5.422</span>
          <span className="font-light text-slate-900 text-sm">users</span>
        </div>
        <div className="flex flex-col items-center bg-gray-100 rounded-sm p-2">
          <span>Gold plan</span>
          <Medal className="text-amber-600 p-[10px] h-10 w-10 bg-yellow-200 rounded-sm mt-1 text-base" />
          <span className="font-semibold text-xl mt-2">2.688</span>
          <span className="font-light text-slate-900 text-sm">users</span>
        </div>
        <div className="flex flex-col items-center bg-gray-100 rounded-sm p-2">
          <span>Bronce plan</span>
          <Medal className="text-orange-600 p-[10px] h-10 w-10 bg-orange-200 rounded-sm mt-1 text-base" />
          <span className="font-semibold text-lg mt-2">1.890</span>
          <span className="font-light text-slate-900 text-sm">users</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-gray-500">Silver plan</span>
          <div className="flex gap-3 items-center">
            <Progressbar value={54.22} />
            <span className="text-sm font-semibold text-gray-400">54.22%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-500">Gold plan</span>
          <div className="flex gap-3 items-center">
            <Progressbar value={26.88} />
            <span className="text-sm font-semibold text-gray-400">26.88%</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-500">Bronce plan</span>
          <div className="flex gap-3 items-center">
            <Progressbar value={18.9} />
            <span className="text-sm font-semibold text-gray-400">18.90%</span>
          </div>
        </div>
      </div>
      <div className="flex w-full mt-6 text-slate-400 font-semibold">
        <p>Total Active Subscribers: 10.000</p>
      </div>
    </div>
  )
}
