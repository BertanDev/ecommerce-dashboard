'use client'

import { Graphic } from '@/components/dashboard/Graphic'
import { InfoCard } from '@/components/dashboard/InfoCard'
import { PlansInfo } from '@/components/dashboard/PlansInfo'
import { RevenueAreaGraphic } from '@/components/dashboard/RevenueAreaGraphic'

export default function Dashboard() {
  return (
    <main className="flex flex-col h-screen bg-gray-100 p-6 gap-4">
      <div className="flex gap-4">
        {/** Cards */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <InfoCard
              title="Users"
              value="36,934"
              percent={7.27}
              upOrDown="up"
            />
            <InfoCard
              title="Courses"
              value="142"
              percent={3.21}
              upOrDown="down"
            />
          </div>
          <div className="flex gap-3">
            <InfoCard title="Orders" value="1547" percent={800} upOrDown="up" />
            <InfoCard
              title="Revenue"
              value="$168.165,80"
              percent={1124.78}
              upOrDown="up"
            />
          </div>
        </div>
        {/** Graphic */}
        <div className="flex w-full bg-white pt-6 px-6  rounded-sm">
          {typeof window !== 'undefined' ? <Graphic /> : ''}
        </div>
      </div>
      <div className="flex w-full h-full gap-4">
        {/** Last Sales */}
        <div className="flex w-[70%] bg-white rounded-sm">
          <RevenueAreaGraphic />
        </div>
        {/** Active Plans */}
        <div className="flex p-4 bg-white w-[30%] justify-center rounded-sm">
          <PlansInfo />
        </div>
      </div>
    </main>
  )
}
