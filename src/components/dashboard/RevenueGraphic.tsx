'use client'

import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

export function RevenueGraphic() {
  const options = {
    chart: {
      type: 'area',
    },
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    dataLabels: {
      enabled: false,
    },
    colors: ['#4f46e5', '#16a34a'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
  } as ApexOptions

  const series = [
    {
      name: 'Previous Week',
      data: [2567, 23678, 20000, 11234, 6543, 10223, 3971],
    },
    {
      name: 'Current Week',
      data: [6753, 18764, 1345, 2045],
    },
  ]

  return (
    <div>
      <Chart type="area" options={options} series={series} height={350} />
    </div>
  )
}
