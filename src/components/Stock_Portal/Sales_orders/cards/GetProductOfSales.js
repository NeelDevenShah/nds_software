import React, {useEffect} from "react";
import { useState } from "react";
import Context from "../../../../Context";
import { useContext } from "react";
function GetProductOfSales(props) {

    //Dummy method for Getting Products Of Sales Order
    // const DataList=[];
    const d=[];
    const [salesData, setSalesProduct] = useState(d);
    const getSalesProductData=async()=>{
        const response=await fetch(`http://localhost:5000/api/getdata/productsofsalesorder`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
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
      {/* <td>{data.status}</td> */}
      {/* <td>{11}</td> */}
      <td> <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#EditSalesModal">Edit</button></td>
      <td> <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#ManageStatusModal">Manage</button></td>
      <td> <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#DeleteSalesModal">Delete</button></td>
    </tr>
  })}
</tbody>
  )
}

export default GetProductOfSales
