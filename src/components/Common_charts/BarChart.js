import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

function BarChart({ChartData}) {
  return (
    <div>
      <Bar data={ChartData}/>
    </div>
  )
}

export default BarChart
