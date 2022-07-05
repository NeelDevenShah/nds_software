import React from 'react'
import {useState} from 'react'
import LineChart from '../../../Common_charts/LineChart'
import StockData from '../../../Chart_Datas/Stock_portal_Datas/stockDetails/TotalLineData'
//For the chart Written thing we have imported the file in the one chart file

function WarehousesChartProcessor() {
    const [data, useData]=useState({
        labels: StockData.map((data)=>data.type),
        datasets:[
            {
                label:"Warehouse Stock Details",
                data: StockData.map((data)=>data.quantity),
                backgroundColor: [
                    "#17cf42",
                    "#db1d1d"
                    // We have to add the more colors as there is posibility that the user would have more warehouses
                ],
                borderColor: "black",
                borderWidth: 2,
            }
        ]
    })
    return (
        <div className="col-md-4 my-4">
        <div style={{width: 300}}>
          <div>
          <LineChart chartData={data}/>
          <p><strong>Total Planned Arrival Of Stock</strong></p>
          </div>
        </div>
      </div>
  )
}

export default WarehousesChartProcessor
