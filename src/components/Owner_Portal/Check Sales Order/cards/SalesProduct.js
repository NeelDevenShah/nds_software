import React from 'react'
import { useState } from 'react';
function SalesProduct(props) {

    //Function For Getting Products Of Sales ORder
    const d=[];
    const [salesData, setSalesProduct] = useState(d);
    const getSalesProductData=async()=>{
        const response=await fetch(`http://localhost:5000/api/getdata/productsofsalesorderforcmp`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'cmp-token': localStorage.getItem('cmptoken'),
            'SalesOrderId': props.SalesOrderId
          },
        })
        const json=await response.json();
        setSalesProduct(json)
      }

      useState(()=>{
        getSalesProductData();
      })

  return (
    <tbody>
    {salesData.map((data) => {
    return <tr key={data._id}>
      <td>{data.categoryName}</td>
      <td>{data.productName}</td>
      <td>{data.quantity}</td>
      <td>{data.perPicePrice}</td>
      <td>{data.status}</td>
      <td>{data.dispatchingFrom+" "}</td>
    </tr>
  })}
</tbody>
  )
}

export default SalesProduct
