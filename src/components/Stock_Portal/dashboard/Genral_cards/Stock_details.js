import React from 'react'
import Stock_Details_Chart_Processor from '../../../ChartProcessors/Stock_portal/dashboard/GenralCards/Stock_Details_Chart_Processor'

import active_storge_image from '../../../../images/stockPortal_images/active_storge_image.png'
import regular_stock_image from '../../../../images/stockPortal_images/regular_stock_image.png'
import dead_stock_image from '../../../../images/stockPortal_images/dead_stock_image.png'

function Stock_details() {
  return (
    <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
        <h2 className='pt-3'><strong>Stock Details</strong></h2>
        <div className='container'>
          <div className='row'>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>2500</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src={active_storge_image} style={{ width: '6.5%' }} /> Quantity(s)</h6>
                  <p class="card-text">Active Stock</p>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>3000</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src={regular_stock_image} style={{ width: '6.5%' }} />Quantity(s)</h6>
                  <p class="card-text">Regular Stock</p>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>1500</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src={dead_stock_image} style={{ width: '7.5%' }} />Quantity(s)</h6>
                  <p class="card-text">Dead Stock</p>
                </div>
              </div>
            </div>
            <Stock_Details_Chart_Processor />
            <p><strong>Total Stock Details</strong></p>
          </div>
        </div>
      </div>
  )
}

export default Stock_details
