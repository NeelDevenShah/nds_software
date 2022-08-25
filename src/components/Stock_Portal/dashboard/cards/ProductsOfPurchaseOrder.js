import React, {useEffect, useState} from 'react'

function ProductsOfPurchaseOrder(props) {
  //Function For Getting Product Data Order
  const [productData, setproductData]=useState([])
  const [noData, setnoData]=useState("no");
  const getProducts=async()=>{
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
      if(json.length==0)
      {
        setnoData("yes");
      }
  }

  useState(()=>{
    getProducts();
  })

  return (
    <tbody>
    {noData=="yes"?<><p><strong>No Products Exists, Add To View</strong></p></>:productData.map((data)=>{
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
