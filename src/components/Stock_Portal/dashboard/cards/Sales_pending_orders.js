import React from 'react'
import { useState } from 'react'
import ProductsOfSalesOrder from './ProductsOfSalesOrder'
import ProductsOfPurchaseOrder from './ProductsOfPurchaseOrder'
import shopping_cart from '../../../../images/stockPortal_images/shopping_cart.png'
import { useEffect } from 'react'

function Sales_pending_orders() {
 
  //Function For Getting Data Of Sales Order
  const [sOrderData, setsOrderData]=useState([]);
  const [noData, setnoData]=useState("no");
  const getSalesData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/salesorders', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    setsOrderData(json);
    if(json.length==0)
    {
      setnoData("yes");
    }
  }
  
  useEffect(()=>{
    getSalesData();
  })

  return (
    <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
      <h2 className='pt-3'><strong>Sales Pending Orders</strong></h2>
      <div className='row'>

      {noData=="yes"?<><hr/><h4><strong>No Sales Order Exists, Add New To View</strong></h4></>:sOrderData.map((mdata)=>{
        return <div key={mdata._id} className={`col-md-4 my-4`}>
         <div class="card">
           <div class="card-body">
             <h5 class="card-title"><strong><img src={shopping_cart} style={{ width: '6.5%' }}/>Order Id.: {mdata.SalesOrderId}</strong></h5>
             <table class="table">
               <thead>
                 <tr>
                   <th scope="col">Product Name</th>
                   <th scope="col">Quantity No.'s</th>
                   <th scope="col">Dispatching Status</th>
                 </tr>
               </thead>
               <ProductsOfSalesOrder SalesOrderId={mdata.SalesOrderId}/>
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
