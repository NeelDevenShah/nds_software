import React from 'react'
import Stock_Activity_Chart_Processor from '../../../ChartProcessors/Stock_portal/dashboard/GenralCards/Stock_Activity_Chart_Processor'

import shopping_cart from '../../../../images/stockPortal_images/shopping_cart.png'
import package_img from '../../../../images/stockPortal_images/package_img.png'
import cargo_ship from '../../../../images/stockPortal_images/cargo_ship.png'

function Sales_Activity() {
 // In this component the json will provide the three numbers for the following details and then on passed to the chartData
  return (
      <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
        <h2 className='pt-3'><strong>Sales Activity</strong></h2>
        <div className='container'>
          <div className='row'>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>288</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src={shopping_cart} style={{ width: '6.5%' }} /> Orders</h6>
                  <p class="card-text">To Be Ordered/Produced</p>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>54</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src={package_img} style={{ width: '6.5%' }} />Orders</h6>
                  <p class="card-text">To Be Packed</p>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>23</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src={cargo_ship} style={{ width: '7.5%' }} />Orders</h6>
                  <p class="card-text">To Be Shiped</p>
                </div>
              </div>
            </div>
            <Stock_Activity_Chart_Processor />
            <p><strong>Total Stock Activity Details</strong></p>
          </div>
        </div>
      </div>
  )
}

export default Sales_Activity