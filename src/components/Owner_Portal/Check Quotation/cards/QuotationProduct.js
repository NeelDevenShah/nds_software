import React from 'react'
import { useState } from 'react';

function QuotationProduct(props) {
  
  //Function For Getting Products Of Quotations
  const [quotationData, setquotationData]=useState([])
  const getProductOfQuotation=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getquotationproductsforcmp', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'cmp-token': localStorage.getItem('cmptoken'),
            'quotationId': props.quotationId
        }
    })
    const json=await response.json();
    setquotationData(json);
  }

    useState(()=>{
        getProductOfQuotation();
    })

    return (
        <tbody>
       {quotationData.map((data)=>{
               return <tr key={data._id}>
                <td>{data.categoryName}</td>
                <td>{data.productName}</td>
                <td>{data.quantity}</td>
                <td>{data.perPicePrice}</td>
            </tr>
            })}
        </tbody>
  )
}

export default QuotationProduct
