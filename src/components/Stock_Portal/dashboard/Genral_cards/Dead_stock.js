import React from 'react'

import shopping_cart from '../../../../images/stockPortal_images/shopping_cart.png'

function Dead_stock() {
  return (
    <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
        <h2 className='pt-3'><strong>Dead Stock Items</strong></h2>
          <div className='row'>

          <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>Red Ball Pen</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src={shopping_cart} style={{ width: '6.5%' }} />5000 Units</h6>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>Red Ball Pen</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src={shopping_cart} style={{ width: '6.5%' }} />5000 Units</h6>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>Red Ball Pen</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src={shopping_cart} style={{ width: '6.5%' }} />5000 Units</h6>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>Blue Ball Pen</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src={shopping_cart} style={{ width: '6.5%' }} />5000 Units</h6>
                </div>
              </div>
            </div>

          </div>
        </div>

  )
}

export default Dead_stock
