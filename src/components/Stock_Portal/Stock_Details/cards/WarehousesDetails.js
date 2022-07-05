import React, { useState } from 'react'

import WSTotalStock from '../../../ChartProcessors/Stock_portal/stockDetails/WSTotalStockChsrtProcessors'
import WSArivalStockChartProcessor from '../../../ChartProcessors/Stock_portal/stockDetails/WSArivalStockChartProcessor'
import WSDispatchStockChartProcessor from '../../../ChartProcessors/Stock_portal/stockDetails/WSDispatchStockChartProcessor'
function WarehousesDetails() {
  let i=1;
  const warehouseData = [
    {
      'address': 'A1 punkal Estate, Ahmedabad',
      'PArrival': '50000',
      'IPackaging': '2500',
      'PDispatch': '4300',
      'AStock': '300',
      'RStock': '1355',
      'DStock': '550',
      'TStock': '34000',
    },
    {
      'address': 'B1 Ample Estate, Ahmedabad',
      'PArrival': '50000',
      'IPackaging': '2500',
      'PDispatch': '4300',
      'AStock': '300',
      'RStock': '1355',
      'DStock': '550',
      'TStock': '34000',
    },
    {
      'address': 'C1 Ghanshyam Estate, Ahmedabad',
      'PArrival': '50000',
      'IPackaging': '2500',
      'PDispatch': '4300',
      'AStock': '300',
      'RStock': '1355',
      'DStock': '550',
      'TStock': '34000',
    },
  ]
  const [individualWHData, setIndividualWHData] = useState(warehouseData)
  return (
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      <h2 className='pt-3'><strong>Warehouses Details</strong></h2>
      <div className='container'>
        <div className='row'>

          {individualWHData.map((data)=>{
            return <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <p class="card-text"><strong>Warehouse {i++}<br />{data.address}</strong></p>
                <hr />
                <div className='container'>
                  <p>Planned Arrival(In Qty.): {data.PArrival}</p>
                  <p>In Packaging(In Qty.): {data.IPackaging}</p>
                  <p>Planned Dispatch(In Qty.): {data.PDispatch}</p>
                </div>
                <hr />
                <p>Active Stock(In Qty.): {data.AStock}</p>
                <p>Regular Stock(In Qty.): {data.RStock}</p>
                <p>Dead(In Qty.): {data.DStock}</p>
                <hr />
                <p>Total Stock(In Qty.): {data.TStock}</p>
              </div>
            </div>
          </div>
          })}

          <div className='container'>
            <div className='row d-flex justify-content-center'>
              <WSTotalStock />
              <WSArivalStockChartProcessor />
              <WSDispatchStockChartProcessor />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WarehousesDetails