import React from 'react'
import { useState } from 'react'

function DispatchedOrderProduct(props) {
  
    //Function For Getting Products Of Given Purchase Order
    const [porderData, setpOrderData]=useState([]);
    const getProductsOfOrder=async()=>{
        const response=await fetch('http://localhost:5000/api/doneorders/productsofdispatched', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'cmp-token': localStorage.getItem('cmptoken'),
                'SalesOrderId': props.SalesOrderId
            }
        })
        const json=await response.json();
        setpOrderData(json);
    }

    useState(()=>{
        getProductsOfOrder();
    })

    return (
    <tbody>
          {porderData.map((data) => {
          return <tr key={data._id}>
          <td>{data.categoryName}</td>
          <td>{data.productName}</td>
          <td>{data.quantity}</td>
          <td>{data.perPicePrice}</td>
          <td>{data.dispatchedFrom+" "}</td>
         </tr>
      })}
    </tbody>
  )
}

export default DispatchedOrderProduct
