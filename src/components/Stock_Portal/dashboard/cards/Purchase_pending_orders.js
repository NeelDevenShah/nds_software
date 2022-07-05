import React from 'react'

import Purchased_image from '../../../../images/stockPortal_images/Purchased_image.png'

function Purchase_pending_orders() {
  return (
    <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
    <h2 className='pt-3'><strong>Purchase/Production Pending Orders</strong></h2>
      <div className='row'>

      <div className={`col-md-4 my-4`}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"><strong><img src={Purchased_image} style={{ width: '8%' }} />From K.K. Suplies Store</strong></h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity No.'s</th>
                    <th scope="col">Delivery in(days)</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Black Ink</td>
                    <td>2000</td>
                    <td>2</td>
                    <td>Ordered/In Production</td>
                  </tr>
                  <tr>
                    <td>Blue Ink</td>
                    <td>5000</td>
                    <td>1</td>
                    <td>Dispatched</td>
                  </tr>
                  <tr>
                    <td>Black Raw Lead</td>
                    <td>6500</td>
                    <td>0</td>
                    <td>Arrived</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={`col-md-4 my-4`}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"><strong><img src={Purchased_image} style={{ width: '8%' }} />From K.K. Suplies Store</strong></h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity No.'s</th>
                    <th scope="col">Delivery in(days)</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Black Ink</td>
                    <td>2000</td>
                    <td>2</td>
                    <td>Ordered/In Production</td>
                  </tr>
                  <tr>
                    <td>Blue Ink</td>
                    <td>5000</td>
                    <td>1</td>
                    <td>Dispatched</td>
                  </tr>
                  <tr>
                    <td>Black Raw Lead</td>
                    <td>6500</td>
                    <td>0</td>
                    <td>Arrived</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={`col-md-4 my-4`}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"><strong><img src={Purchased_image} style={{ width: '8%' }} />From K.K. Suplies Store</strong></h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity No.'s</th>
                    <th scope="col">Delivery in(days)</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Black Ink</td>
                    <td>2000</td>
                    <td>2</td>
                    <td>Ordered/In Production</td>
                  </tr>
                  <tr>
                    <td>Blue Ink</td>
                    <td>5000</td>
                    <td>1</td>
                    <td>Dispatched</td>
                  </tr>
                  <tr>
                    <td>Black Raw Lead</td>
                    <td>6500</td>
                    <td>0</td>
                    <td>Arrived</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className={`col-md-4 my-4`}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"><strong><img src={Purchased_image} style={{ width: '8%' }} />From K.K. Suplies Store</strong></h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity No.'s</th>
                    <th scope="col">Delivery in(days)</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Black Ink</td>
                    <td>2000</td>
                    <td>2</td>
                    <td>Ordered/In Production</td>
                  </tr>
                  <tr>
                    <td>Blue Ink</td>
                    <td>5000</td>
                    <td>1</td>
                    <td>Dispatched</td>
                  </tr>
                  <tr>
                    <td>Black Raw Lead</td>
                    <td>6500</td>
                    <td>0</td>
                    <td>Arrived</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
  </div>
  )
}

export default Purchase_pending_orders
