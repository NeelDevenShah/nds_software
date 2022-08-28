import React, {useEffect, useState, useContext} from 'react'
import Context from '../../../../Context'
const GetProductOfPurchase = (props) => {

    const context=useContext(Context);
    const {prodDelId, setprodDelId, prodEditId, setprodEditId, epquantity, setepquantity, ePppp, setePppp, productIdForManageP, setproductIdForManageP, dataOfpProduct, setDataOfpProduct}=context;

    //Function For Getting Products Of Given PurchaseOrderId
    const PproductDetail=[];
    const [Pproducts, setPproducts] = useState(PproductDetail);
    const whstarter=[];
    const [whdetails, setWhdetails]=useState(whstarter);
    const getproductsOfOrder=async()=>{
      const response=await fetch(`http://localhost:5000/api/getdata/productsofpurchaseorder`, {
      method: 'GET',  
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'purchaseOrderId': props.purchaseOrderId
        },
      })
      const json=await response.json();
      setPproducts(json);
    }

    //Function For Getting Details Of Product By its Id
    const findProductDetails=async(id)=>{
      setprodEditId(id)
      const response=await fetch(`http://localhost:5000/api/purchaseorder/getproductdetailbyid/${id}`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        }
      })
      const json=await response.json();
      setepquantity(json.quantity);
      setePppp(json.perPicePrice);
    }

    //Function For Sending Information To Main Page For Manage Product
    const sendInfoForManage=async(id)=>{
      await setproductIdForManageP(id)
      await getProductInfo(id);
    }

  //Function(Secondary) For Getting All Data Of Selected product Of Purchase Order By Id For Managing Order
  const getProductInfo=async(id)=>{
  const response=await fetch(`http://localhost:5000/api/purchaseorder/getproductdetailbyid/${id}`, {
  method: 'GET',
  headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const json=await response.json();
    setDataOfpProduct(json);
  }

    useState(()=>{
      getproductsOfOrder();
    })

    return (
          <tbody>
          {Pproducts.map((oprodDetails) => {
          return <tr  key={oprodDetails._id}>
          <td>{oprodDetails.categoryName}</td>
          <td>{oprodDetails.productName}</td>
          <td>{oprodDetails.quantity}</td>
          <td>{oprodDetails.perPicePrice}</td>
          <td>{oprodDetails.status}</td>
          <td>{oprodDetails.arrivingat+" "}</td>
          <td> <button type="button" onClick={()=>{findProductDetails(oprodDetails._id)}} class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#EditPurchaseprodModal">Edit</button></td>
          <td> <button type="button" onClick={()=>{sendInfoForManage(oprodDetails._id)}} class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#ManageStatusModal">Manage</button></td>
          <td> <button type="button" onClick={()=>{setprodDelId(oprodDetails._id)}} class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#DeletePurchaseproductModal">Delete</button></td>
         </tr>
      })}
    </tbody>
  )
}

export default GetProductOfPurchase
