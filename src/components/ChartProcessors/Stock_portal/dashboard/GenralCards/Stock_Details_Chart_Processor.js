import React from 'react'
import {useState} from 'react'
import PieChart from '../../../../Common_charts/PieChart'
import StockData from '../../../../Chart_Datas/Stock_portal_Datas/dashboard/Stock_details_data'
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function Stock_Details_Chart_Processor() {
  Chart.register(ChartDataLabels);
  Chart.defaults.set('plugins.datalabels', {
    color: 'white'
  });
    const [data, setData]=useState({
        labels: StockData.map((data)=>data.type),
        datasets: [
            {
                label: "Stock Usage Details",
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
