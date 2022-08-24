import React, {useEffect, useState} from 'react'

function ProductsOfPurchaseOrder(props) {
  //Function For Getting Product Data Order
  const [productData, setproductData]=useState([])
  const getProducts=async()=>{
    console.log("wlc")
    const response=await fetch(`http://localhost:5000/api/getdata/productsofpurchaseorder`, {
      method: 'GET',  
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'purchaseOrderId': props.purchaseOrderId
        },
      })
      const json=await response.json();
      setproductData(json);
      console.log("bye")
  }

  useState(()=>{
    getProducts();
  })

  return (
    <tbody>
    {productData.map((data)=>{
      return <tr key={data._id}>
       <td>{data.productName}</td>
       <td>{data.quantity}</td>
       <td>{data.status}</td>
     </tr>
    })}
  </tbody>
  )
}

export default ProductsOfPurchaseOrder
