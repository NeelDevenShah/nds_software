import React, { useState } from 'react'

import Purchased_image from '../../../../images/stockPortal_images/Purchased_image.png'

function Purchase_pending_orders() {
  const MData=[
    {
      'order_company': 'From K.K. Suplies Store',
    },
    {
      'order_company': 'From J.K. Suplies Store',
    },
    {
      'order_company': 'From K.P. Suplies Store',
    },
    {
      'order_company': 'From J.J. Suplies Store',
    }
  ]
  const [mainData, setMainData]=useState(MData)
  const purchaseData=[
    {
      'product_name': 'Black Ball Pen',
      'Quantity': '2000',
      'Delivery_in': 2,
      'status': 'Ordered/In Production',
      'last_update': '05/07/2022'
    },
    {
      'product_name': 'Black Ball Pen',
      'Quantity': '2000',
      'Delivery_in': 2,
      'status': 'Ordered/In Production',
      'last_update': '05/07/2022'
    },
    {
      'product_name': 'Black Ball Pen',
      'Quantity': '2000',
      'Delivery_in': 2,
      'status': 'Ordered/In Production',
      'last_update': '05/07/2022'
    },
    {
      'product_name': 'Black Ball Pen',
      'Quantity': '2000',
      'Delivery_in': 2,
      'status': 'Ordered/In Production',
      'last_update': '05/07/2022'
    },
  ]
  const [pData, setPData]=useState(purchaseData)
  return (
    <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
    <h2 className='pt-3'><strong>Purchase/Production Pending Orders</strong></h2>
      <div className='row'>

      {mainData.map((mdata)=>{
         return <div className={`col-md-4 my-4`}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"><strong><img src={Purchased_image} style={{ width: '8%' }} />{mdata.order_company}</strong></h5>
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
                  {pData.map((data)=>{
                    return <tr>
                     <td>{data.product_name}</td>
                     <td>{data.Quantity}</td>
                     <td>{data.Delivery_in}</td>
                     <td>{data.status}</td>
                   </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      })}

      </div>
  </div>
  )
}

export default Purchase_pending_orders
