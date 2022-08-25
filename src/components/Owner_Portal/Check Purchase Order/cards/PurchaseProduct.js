import React from 'react'
import { useState } from 'react';
function PurchaseProduct(props) {

    //Function For Getting Products Of Sales ORder
    const [purchaseData, setPurchaseProduct]=useState([]);
    const [noData, setnoData]=useState("no");
    const getPurchaseProductData=async()=>{
        const response=await fetch(`http://localhost:5000/api/getdata/productsofpurchaseorderforcmp`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'cmp-token': localStorage.getItem('cmptoken'),
            'purchaseOrderId': props.purchaseOrderId
          },
        })
        const json=await response.json();
        setPurchaseProduct(json)
        if(json.length==0)
        {
          setnoData("yes");
        }
      }

      useState(()=>{
        getPurchaseProductData();
      })

  return (
    <tbody>
    {noData=="yes"?<><p><strong>No Products Exists In Order</strong></p></>:purchaseData.map((data) => {
    return <tr key={data._id}>
      <td>{data.categoryName}</td>
      <td>{data.productName}</td>
      <td>{data.quantity}</td>
      <td>{data.perPicePrice}</td>
      <td>{data.status}</td>
      <td>{data.arrivingat+" "}</td>
    </tr>
  })}
</tbody>
  )
}

export default PurchaseProduct
