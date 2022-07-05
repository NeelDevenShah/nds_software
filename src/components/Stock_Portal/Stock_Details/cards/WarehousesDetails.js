import React from 'react'

import WSTotalStock from '../../../ChartProcessors/Stock_portal/stockDetails/WSTotalStockChsrtProcessors'
import WSArivalStockChartProcessor from '../../../ChartProcessors/Stock_portal/stockDetails/WSArivalStockChartProcessor'
import WSDispatchStockChartProcessor from '../../../ChartProcessors/Stock_portal/stockDetails/WSDispatchStockChartProcessor'
function WarehousesDetails() {
  return (
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      <h2 className='pt-3'><strong>Warehouses Details</strong></h2>
      <div className='container'>
        <div className='row'>


          <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <p class="card-text"><strong>Warehouse 1<br />B1 punkal Estate, Ahmedabad</strong></p>
                <hr />
                <div className='container'>
                  <p>Planned Arrival(In Qty.): 50000</p>
                  <p>In Packaging(In Qty.): 2500</p>
                  <p>Planned Dispatch(In Qty.): 4300</p>
                </div>
                <hr />
                <p>Active Stock(In Qty.): 300</p>
                <p>Regular Stock(In Qty.): 1355</p>
                <p>Dead(In Qty.): 550</p>
                <hr />
                <p>Total Stock(In Qty.): 55550</p>
              </div>
            </div>
          </div>

          <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <p class="card-text"><strong>Warehouse 1<br />B1 punkal Estate, Ahmedabad</strong></p>
                <hr />
                <div className='container'>
                  <p>Planned Arrival(In Qty.): 50000</p>
                  <p>In Packaging(In Qty.): 2500</p>
                  <p>Planned Dispatch(In Qty.): 4300</p>
                </div>
                <hr />
                <p>Active Stock(In Qty.): 300</p>
                <p>Regular Stock(In Qty.): 1355</p>
                <p>Dead(In Qty.): 550</p>
                <hr />
                <p>Total Stock(In Qty.): 55550</p>
              </div>
            </div>
          </div>

          <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <p class="card-text"><strong>Warehouse 1<br />B1 punkal Estate, Ahmedabad</strong></p>
                <hr />
                <div className='container'>
                  <p>Planned Arrival(In Qty.): 50000</p>
                  <p>In Packaging(In Qty.): 2500</p>
                  <p>Planned Dispatch(In Qty.): 4300</p>
                </div>
                <hr />
                <p>Active Stock(In Qty.): 300</p>
                <p>Regular Stock(In Qty.): 1355</p>
                <p>Dead(In Qty.): 550</p>
                <hr />
                <p>Total Stock(In Qty.): 55550</p>
              </div>
            </div>
          </div>
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