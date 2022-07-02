import React from 'react'
import {useState} from 'react'
import PieChart from '../Common_charts/PieChart'
import StockData from '../Chart_Datas/Stock_portal_Datas/Stock_details_data'
import {Chart} from 'chart.js';

function Stock_Details_Chart_Processor() {
    const [data, setData]=useState({
        labels: StockData.map((data)=>data.type),
        datasets: [
            {
                label: "Stock Details",
                data: StockData.map((data)=>data.quantity),
                backgroundColor: [
                  "#17cf42",
                    "#2a71d0",
                    "#db1d1d"
                  ],
                  borderColor: "white",
                   borderWidth: 2,
            }
        ]
    })
    return (
    <div className="d-flex justify-content-center">
      <div style={{width: 300}}>
        <div>
        <PieChart chartData={data}/>
        </div>
      </div>
    </div>
  )
}

export default Stock_Details_Chart_Processor
