import React from 'react'

import shopping_cart from '../../../../images/stockPortal_images/shopping_cart.png'

function Sales_pending_orders() {
  return (
    <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
        <h2 className='pt-3'><strong>Sales Pending Orders</strong></h2>
          <div className='row'>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><strong><img src={shopping_cart} style={{ width: '6.5%' }} />Order No.: #223</strong></h5>
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
                        <td>Black Ball pen</td>
                        <td>2000</td>
                        <td>2</td>
                        <td>Ordered/In Production</td>
                      </tr>
                      <tr>
                        <td>Blue Ball pen</td>
                        <td>5000</td>
                        <td>0</td>
                        <td>Packed</td>
                      </tr>
                      <tr>
                        <td>Pointer Pencil</td>
                        <td>6500</td>
                        <td>0</td>
                        <td>Shiped</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><strong><img src={shopping_cart} style={{ width: '6.5%' }} />Order No.: #223</strong></h5>
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
                        <td>Black Ball pen</td>
                        <td>2000</td>
                        <td>2</td>
                        <td>Ordered/In Production</td>
                      </tr>
                      <tr>
                        <td>Blue Ball pen</td>
                        <td>5000</td>
                        <td>0</td>
                        <td>Packed</td>
                      </tr>
                      <tr>
                        <td>Pointer Pencil</td>
                        <td>6500</td>
                        <td>0</td>
                        <td>Shiped</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><strong><img src={shopping_cart} style={{ width: '6.5%' }} />Order No.: #223</strong></h5>
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
                        <td>Black Ball pen</td>
                        <td>2000</td>
                        <td>2</td>
                        <td>Ordered/In Production</td>
                      </tr>
                      <tr>
                        <td>Blue Ball pen</td>
                        <td>5000</td>
                        <td>0</td>
                        <td>Packed</td>
                      </tr>
                      <tr>
                        <td>Pointer Pencil</td>
                        <td>6500</td>
                        <td>0</td>
                        <td>Shiped</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><strong><img src={shopping_cart} style={{ width: '6.5%' }} />Order No.: #223</strong></h5>
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
                        <td>Black Ball pen</td>
                        <td>2000</td>
                        <td>2</td>
                        <td>Ordered/In Production</td>
                      </tr>
                      <tr>
                        <td>Blue Ball pen</td>
                        <td>5000</td>
                        <td>0</td>
                        <td>Packed</td>
                      </tr>
                      <tr>
                        <td>Pointer Pencil</td>
                        <td>6500</td>
                        <td>0</td>
                        <td>Shiped</td>
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

export default Sales_pending_orders
