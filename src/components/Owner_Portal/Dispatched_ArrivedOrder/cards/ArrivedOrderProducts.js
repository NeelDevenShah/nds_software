import React from 'react'
import { useState } from 'react'

function ArrivedOrderProducts(props) {
  
    //Function For Getting Products Of Given Purchase Order
    const [sorderData, setsOrderData]=useState([]);
    const [noData, setnoData]=useState("no");
    const getProductsOfOrder=async()=>{
        const response=await fetch('http://localhost:5000/api/doneorders/productsofarrived', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'cmp-token': localStorage.getItem('cmptoken'),
                'purchaseOrderId': props.purchaseOrderId
            }
        })
        const json=await response.json();
        setsOrderData(json);
        if(json.length==0)
        {
          setnoData("yes");
        }
    }

    useState(()=>{
        getProductsOfOrder();
    })

    return (
    <tbody>
          {noData=="yes"?<><p><strong>No Products Exists In Order</strong></p></>:sorderData.map((data) => {
          return <tr key={data._id}>
          <td>{data.categoryName}</td>
          <td>{data.productName}</td>
          <td>{data.quantity}</td>
          <td>{data.perPicePrice}</td>
          <td>{data.arrivedAt+" "}</td>
         </tr>
      })}
    </tbody>
  )
}

export default ArrivedOrderProducts

