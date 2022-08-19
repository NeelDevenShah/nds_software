import React, { useEffect } from 'react'
import {useState} from 'react'

function GetQuotationProducts(props) {
    //Dummy method for getting the products of the given quotationNum
    let item=[]; 
    const [QpData, setQpData] = useState(item)

    //For getting the data of the product of quotation
    const getQProductData=async()=>{
        const response=await fetch(`http://localhost:5000/api/getdata/getquotationproducts`, {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
              'quotationNum': props.quotationNum
            },
          })
          const json=await response.json();
          setQpData(json);
      }

    //For deleting the quotation's Product
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
            props.getQData();
            getQProductData();
        }
        else{
            console.log("delete product failed");
        }
    }

    const editproduct=()=>{
        var html = '<div class="modal fade" id="AddQuotationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">'
        +'<div class="modal-dialog">'
            +'<div class="modal-content">'
                +'<div class="modal-header">'
                    +'<h5 class="modal-title" id="exampleModalLabel">Add New Quotataion</h5>'
                    +'<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
                +'</div>'
                +'<div class="modal-body">'
                    +'<form>'
                        +'<div class="mb-3">'
                        +'<label class="form-label">Enter An Unique Quotation Id</label>'
                            +'<input type="number" class="form-control text-center" id="comp" aria-describedby="emailHelp" name="quotationNum" value={newqdata.quotationNum} onChange={onChangeForNewQ} required />'
                            +'<label class="form-label">Enter The Name Of Company To Whom Quotation Is To Be Given</label>'
                            +'<input type="text" class="form-control text-center" id="comp" aria-describedby="emailHelp" name="compName" value={newqdata.compName} onChange={onChangeForNewQ} required />'
                        +'</div>'
                    +'</form>'
                +'</div>'
                +'<div class="modal-footer">'
                    +'<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>'
                    +'<button type="button" onClick={()=>{addquotation()}} class="btn btn-secondary" data-bs-dismiss="modal">Submit</button>'
                +'</div>'
            +'</div>'
        +'</div>'
    +'</div>';
            document.body.innerHTML = html;
    }

      useState(()=>{
        getQProductData();
    })
    return (
    <tbody>
           {QpData.map((pdata)=>{
                   return <tr key={pdata._id}>
                    <td>{pdata.categoryName}</td>
                    <td>{pdata.productName}</td>
                    <td>{pdata.quantity}</td>
                    <td>{pdata.perPicePrice}</td>
                    <td> <button onClick={()=>{editproduct()}} type="button" class="btn btn-info btn-sm" pdata-bs-toggle="modal" pdata-bs-target="#EditQuotationModal">Edit</button></td>
                    <td> <button onClick={()=>{deleteQuotationProduct(pdata._id)}} type="button" class="btn btn-danger btn-sm">Delete</button></td>
                  </tr>
                })}
    </tbody>
  )
}

export default GetQuotationProducts
