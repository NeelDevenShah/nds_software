import React, { useEffect, useState } from 'react'
import ProductsOfPurchaseOrder from './ProductsOfPurchaseOrder'
import Purchased_image from '../../../../images/stockPortal_images/Purchased_image.png'

function Purchase_pending_orders() {
  //Function For Getting Data Of Purchase Order
  const [pData, setPData]=useState([])
  const getPOrderData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/purchaseorders', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    setPData(json);
  }
  
  useEffect(()=>{
    getPOrderData();
  })
  
  return (
    <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
    <h2 className='pt-3'><strong>Purchase Pending Orders</strong></h2>
      <div className='row'>

      {pData.map((mdata)=>{
         return <div key={mdata._id} className={`col-md-4 my-4`}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"><strong><img src={Purchased_image} style={{ width: '8%' }} /> {mdata.purchaseDealer}</strong></h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity No.'s</th>
                    <th scope="col">Arrival Status</th>
                  </tr>
                </thead>
                  <ProductsOfPurchaseOrder purchaseOrderId={mdata.purchaseOrderId}/>
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
