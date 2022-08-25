import React, {useState, useEffect} from 'react'

function ProductsOfSalesOrder(props) {
  //Function For Getting Product Of Order
  const [productData, setproductData]=useState([])
  const [noData, setnoData]=useState("no");
  const getProducts=async()=>{
    const response=await fetch(`http://localhost:5000/api/getdata/productsofsalesorder`, {
        method: 'GET',
        headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'SalesOrderId': props.SalesOrderId
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
    }
    )
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

export default ProductsOfSalesOrder
