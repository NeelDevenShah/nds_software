import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

function PieChart({chartData}) {
  return (
    <div>   
      {/* {console.log("kaka")} */}
      <Line data={chartData}/>
    </div>
  )
}

export default PieChart
