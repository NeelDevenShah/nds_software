import React from 'react'
import { useState } from 'react'
import PieChart from '../../../../Common_charts/PieChart'
import ActivityData from '../../../../Chart_Datas/Stock_portal_Datas/dashboard/Sales_activity_data'

function Stock_Activity_Chart_Processor() {
  const [data, setData] = useState({
    labels: ActivityData.map((data) => data.type),
    datasets: [
      {
        label: "Stock Activity Details",
        data: ActivityData.map((data) => data.quantity),
        backgroundColor: [
          "#17cf42",
          "#2a71d0",
          "#db1d1d"
        ],
        borderColor: "white",
        borderWidth: 2,
      }
    ],
  })
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div style={{ width: 300 }}>
          <div>
            <PieChart chartData={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stock_Activity_Chart_Processor
