'use client'

import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

export function Graphic() {
  const series = [
    {
      name: 'Quantity',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 70, 77, 51],
    },
  ]

  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    title: {
      text: 'Last 12 month sales',
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: [
      'Sept 22',
      'Oct 22',
      'Nov 22',
      'Dec 22',
      'Jan 23',
      'Feb 23',
      'Mar 23',
      'Apr 23',
      'May 23',
      'June 23',
      'July 23',
      'Aug 23',
    ],
    yaxis: [
      {
        title: {
          text: 'Sales',
        },
      },
    ],
    colors: ['#4B0082'],
  } as ApexOptions

  return (
    <Chart
      type="bar"
      options={options}
      series={series}
      width={900}
      height={190}
    />
  )
}
