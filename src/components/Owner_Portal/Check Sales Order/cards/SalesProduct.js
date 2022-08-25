import React from 'react'
import { useState } from 'react';
function SalesProduct(props) {

    //Function For Getting Products Of Sales Order
    const [salesData, setSalesProduct] = useState([]);
    const [noData, setnoData]=useState("no");
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
        if(json.length==0)
      {
        setnoData("yes");
      }
      }

      useState(()=>{
        getSalesProductData();
      })

  return (
    <tbody>
    {noData=="yes"?<><p><strong>No Products Exists In Order</strong></p></>:salesData.map((data) => {
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
