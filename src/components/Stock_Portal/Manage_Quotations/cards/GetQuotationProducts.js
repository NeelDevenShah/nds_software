import React, { useEffect } from 'react'
import {useState} from 'react'
import Context from '../../../../Context';
import {useContext} from 'react'

function GetQuotationProducts(props) {
    const context=useContext(Context);
    const {giveId, editId, editquantity, setEditquantity, editppp, seteditppp, quotId, seteditQuotId}=context;
    //Dummy Method For Getting Products Of Given quotationId
    let item=[];
    const [QpData, setQpData] = useState(item)

      //For Error Notification
  const [showError, setError]=useState("");

    //For Getting Data Of Product Of Quotation
    const getQProductData=async()=>{
        const response=await fetch(`http://localhost:5000/api/getdata/getquotationproducts`, {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
              'quotationId': props.quotationId
            },
          })
          const json=await response.json();
          setQpData(json);
      }

    //For Deleting Quotation's Product
    const deleteQuotationProduct=async(id)=>{
        const response=await fetch(`http://localhost:5000/api/quotation/deleteproduct/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        })
        const json=await response.json();
        if(json.success)
        {
            document.location.reload();
        }
        else{
            setError(json.error);
        document.getElementById("errorModal").click();
        }
    }


    useState(()=>{
        getQProductData();
    })

    //For Making Change Conform After Taking New Data From editProductModal
    const makeChangeconform=async()=>{
        const response=await fetch(`http://localhost:5000/api/quotation/editproduct/${editId}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({quantity: editquantity, perPicePrice: editppp})
        })
        const json=await response.json();
        if(json.success)
        {
            document.location.reload();
        }
        else{
            setError(json.error);
        document.getElementById("errorModal").click();
        }
    }

    const onChange1=(event)=>{
        setEditquantity(event.target.value)
    }
    const onChange2=(event)=>{
        seteditppp(event.target.value)
    }

    //For Getting Data Of Product That Is To Be Edited
    const getDataOfProductById=async(id)=>{
        giveId(id);
        const response=await fetch(`http://localhost:5000/api/quotation/getproductdetailsbyid/${id}`, {
          headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        })
        const json=await response.json();
        seteditQuotId(json.quotationId)
        setEditquantity(json.quantity);
        seteditppp(json.perPicePrice);
        document.forms.editmodalform.quantity.value=json.quantity;
        document.forms.editmodalform.ppp.value=json.perPicePrice;
      }

    return (
    <tbody>
            {/* Edit product Modal */}
            <div class="modal fade" id="EditQuotationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Quotation Product</h5>
                    </div>
                    <div class="modal-body">
                        Edit The Thing You Want To Change, Otherwise Not Make Change In It, The Change Can Only Be Made In The Quantity And Per-Piece Price 
                        <hr/>
                        <form name='editmodalform'>
                            {/* The system would be maked that the information would be shown and some of them would be permited to change */}
                            <label class="form-label">Quantity Of Product</label>
                            <input name="quantity" value={editquantity} type="number" onChange={onChange1} class="form-control text-center" id="quantity" required />

                            <label class="form-label">Per-Piece Price Of Product</label>
                            <input name="ppp" value={editppp} type="number" onChange={onChange2} class="form-control text-center" id="ppp" required />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>{makeChangeconform()}} class="btn btn-secondary" data-bs-dismiss="modal">Change</button>
                    </div>
                </div>
            </div>
        </div>
        {/*  */}
        {/* Modal Code */}
      {/* <!-- Button trigger modal --> */}
<button type="button" id="errorModal" class="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Login Page Error</h5>
        </div>
      <div class="modal-body">
        {showError}
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Understood</button>
      </div>
    </div>
  </div>
</div>
      {/*  */}
           {QpData.map((pdata)=>{
                   return <tr key={pdata._id}>
                    <td>{pdata.categoryName}</td>
                    <td>{pdata.productName}</td>
                    <td>{pdata.quantity}</td>
                    <td>{pdata.perPicePrice}</td>
                    <td> <button onClick={()=>{getDataOfProductById(pdata._id)}} type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#EditQuotationModal">Edit</button></td>
                    <td> <button onClick={()=>{deleteQuotationProduct(pdata._id)}} type="button" class="btn btn-danger btn-sm">Delete</button></td>
                  </tr>
                })}
    </tbody>
  )
}

export default GetQuotationProducts
