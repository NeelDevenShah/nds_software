import React, {useEffect} from "react";
import { useState } from "react";
import { useContext } from "react";
import Context from "../../../../Context";
function GetProductOfSales(props) {

    const context=useContext(Context);
    const {sprodDelId, setsProdDelId, smanageId, setsmanageId, seditId, setsEditId, espquantity, setespquantity, esPppp, setesPppp}=context;

    //Dummy method for Getting Products Of Sales Order
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

    //Function For Getting Data Of Product Of Sales Order By Id For ProductEditModal
    const geteproductData=async(id)=>{
    setsEditId(id);
    const response=await fetch(`http://localhost:5000/api/salesorder/getproductdetails/${id}`, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    setespquantity(json.quantity);
    setesPppp(json.perPicePrice);
  }

    return (
     <tbody>
    {salesData.map((data) => {
    return <tr key={data._id}>
      <td>{data.categoryName}</td>
      <td>{data.productName}</td>
      <td>{data.quantity}</td>
      <td>{data.perPicePrice}</td>
      <td>{data.status}</td>
      <td> <button type="button" onClick={()=>{geteproductData(data._id)}} class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#EditSalesModal">Edit</button></td>
      <td> <button type="button" onClick={()=>{setsmanageId(data._id)}} class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#ManageStatusModal">Manage</button></td>
      <td> <button type="button" onClick={()=>{setsProdDelId(data._id)}} class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#DeleteSalesModalproduct">Delete</button></td>
    </tr>
  })}
</tbody>
  )
}

export default GetProductOfSales
