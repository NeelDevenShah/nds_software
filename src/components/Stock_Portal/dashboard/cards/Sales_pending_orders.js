import React from 'react'
import { useState } from 'react'

import shopping_cart from '../../../../images/stockPortal_images/shopping_cart.png'

function Sales_pending_orders() {
  const MData = [
    {
      'order_no': '#223',
    },
    {
      'order_no': '#225',
    },
    {
      'order_no': '#222',
    },
    {
      'order_no': '#226',
    }
  ]
  const [mainData, setMainData] = useState(MData)
  const purchaseData = [
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
  const [pData, setPData] = useState(purchaseData)
  return (
    <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
      <h2 className='pt-3'><strong>Sales Pending Orders</strong></h2>
      <div className='row'>

      {mainData.map((mdata)=>{
        return <div className={`col-md-4 my-4`}>
         <div class="card">
           <div class="card-body">
             <h5 class="card-title"><strong><img src={shopping_cart} style={{ width: '6.5%' }} />Order No.: {mdata.order_no}</strong></h5>
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

export default Sales_pending_orders
