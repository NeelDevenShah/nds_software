import React from 'react'
import {useState} from 'react'
import PieChart from '../../../Common_charts/PieChart'
import WArrivalData from '../../../Chart_Datas/Stock_portal_Datas/stockDetails/WSArrivalData'
//For the chart Written thing we have imported the file in the one chart file

function WarehousesChartProcessor() {
    const [data, useData]=useState({
        labels: WArrivalData.map((data)=>data.type),
        datasets:[
            {
                label:"Warehouse Stock Details",
                data: WArrivalData.map((data)=>data.quantity),
                backgroundColor: [
                    "#17cf42",
                    "#2a71d0",
                    "#db1d1d"
                    // We have to add the more colors as there is posibility that the user would have more warehouses
                ],
                borderColor: "white",
                borderWidth: 2,
            }
        ]
    })
    return (
        <div className="col-md-4 my-4">
        <div style={{width: 300}}>
          <div>
          <PieChart chartData={data}/>
          <p><strong>Total Planned Arrival Of Stock</strong></p>
          </div>
        </div>
      </div>
  )
}

export default WarehousesChartProcessor
