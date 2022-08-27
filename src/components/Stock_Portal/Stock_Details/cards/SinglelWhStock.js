import React, { useState } from 'react'
import {useEffect} from 'react'
import ProductsOfSingleWarehouse from './ProductsOfSingleWarehouse';
import Context from '../../../../Context';
import { useContext } from 'react';

function TotalWarehousesStock(props) {

  const context=useContext(Context);
  const {sdmoveId, setSdmoveId, sddeleteId, setSddeleteId, getproductDetails, prodByid}=context;

    //For Error Notification
    const [showError, setError]=useState("");

  //Function For Getting Warehouses
  const [address, setAddress] = useState([]);
  const getwarehouse=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getwarehouses', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const json=await response.json();
    setAddress(json)
  }

  //Function For Moving Products From One Warehouse To Another
  const [mQty, setmQty]=useState(0);
  const [mwareId, setmWareId]=useState(-1);
  const mqtyonChange=(event)=>{
    setmQty(event.target.value);
  }
  const moveProduct=async(id)=>{
    if(mwareId==-1 || parseInt(mQty)==0)
    {
      setError("Please Enter Right Information");
      document.getElementById("errorModal").click();
    }
    else{
      const response=await fetch(`http://localhost:5000/api/managestock/movestock/${id}`, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({newProdWarehouseId:mwareId, qty:parseInt(mQty)})
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
  }

  //Function For Deleting All Product
  const deleteAllOfProduct=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/managestock/deletefromwh/${id}`, {
      method: 'DELETE',
      headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({qty: -1})
    })
    const json=await response.json();
      if(json.success)
      {
        document.location.reload();
      }
      else{
          setError(json.error)
          document.getElementById("errorModal").click();
      }
  }

  //Function For Deleting Some Product
  const [delprodQty, setdelprodQty]=useState(0);
  const onChangedel=(event)=>{
    setdelprodQty(event.target.value)
  }
  const deleteSomeProduct=async(id)=>{
    if(delprodQty!="")
    {
      const response=await fetch(`http://localhost:5000/api/managestock/deletefromwh/${id}`, {
      method: 'DELETE',
      headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({qty: delprodQty})
      })
      const json=await response.json();
      if(json.success)
      {
        document.location.reload();
      }
      else{
          setError(json.error)
          document.getElementById("errorModal").click();
      }
    }
    else{
      setError("Please Enter Right Quantity");
      document.getElementById("errorModal").click();
    }
  }

  useEffect(()=>{
    getwarehouse();
  })

  return (
    <>
      {/* <MoveStockModal /> */}
      <div class="modal fade" id="MoveSModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Move Stock</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Once The Stock Is Been Moved, It Cannot Be Reverted Back, So Make The Changes Carefully
                        <hr />
                        At The Current Time The Stock Of <strong>{prodByid.productName}</strong> Present Is <strong>{prodByid.quantity}</strong>, Make Sure You Transfer The Less Amount Or The Amount Equal To It
                        <hr />
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Select Warehouse Where You Want To Transfer The Stock</label>
                                
                                <div class="dropdown">
                                    <select class="form-select form-select-sm mb-3" onClick={(event)=>{setmWareId(event.target.value)}} aria-label=".form-select-lg example">
                                        <option value={-1}>Select Here</option>
                                        {address.map((wh) => {
                                            return <option value={wh.warehouseId}>{wh.wname}</option>
                                        })}
                                    </select>
                                </div>
                                </div>
                                    <label class="form-label">Enter Amount Of Item You Want To Transfer</label>
                                    <input type="number" onChange={mqtyonChange} class="form-control text-center" id="mQty" name="mQty" required />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>{moveProduct(prodByid._id)}} class="btn btn-secondary" data-bs-dismiss="modal">Add</button>
                    </div>
                </div>
            </div>
        </div>
      {/*  */}
      {/* <DeleteStockModal /> */}
      <div>
        {/* <DeleteSomeStock/> */}
        <div class="modal fade" id="deleteSome" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete Some Stock Conformation</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        For Deleting Some Of The Stock Of <strong>{prodByid.productName}</strong> From warehouseId: <strong>{prodByid.prodWarehouseId}</strong>, Enter The Amount You Want To Delete, The Present Amount Of The Item Is: <strong>{prodByid.quantity}</strong>
                        <hr/>
                        <form>
                        <div class="mb-3">
                            <label class="form-label"><strong>Enter The Quantity You Want To Delete & Make Sure The Quantity Is Lower Than The Stock Present</strong></label>
                            <input type="number" name="delprodQty" onChange={onChangedel} class="form-control" id="qtyofdeleted" required/>
                            </div>
                          </form>
                        
                        <button type="button" class="btn btn-secondary mx-3" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" onClick={()=>{deleteSomeProduct(sddeleteId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
                    </div>
                </div>
            </div>
        </div>
        {/*  */}
        {/* <DeleteAllStockModal/> */}
        <div class="modal fade" id="deleteAll" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete All Stock Conformation</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    Once You Delete The Stock, Stock Can Not Come Back And The Data Will Be Deleted For-Ever
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>{deleteAllOfProduct(sddeleteId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
                    </div>
                </div>
            </div>
        </div>
        {/*  */}
       <div class="modal fade" id="DeleteSModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Stock</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           Choose One Of The Following :
                           <button type="button" class="btn btn-secondary my-3" data-bs-toggle="modal" data-bs-target="#deleteSome">Delete Some Of Stock Of Selected Item</button>
                           <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#deleteAll">Delete All Stocks Of Selected Item</button>
                        </div>
                        <div class="modal-footer">
                        </div>
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
        <h5 class="modal-title" id="staticBackdropLabel">Stock Details Page Error</h5>
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
      {address.map((dataadd)=>{
        return <div className='container bg-white py-4  my-4' style={{ borderRadius: '5px' }}> 
        <h2 className='pt-3'><strong>Stock In {dataadd.wname}</strong></h2>
        <p>{dataadd.shopNum}, {dataadd.add2}, {dataadd.city}, {dataadd.state}</p>
        <div className='row'>
            <div className='table-responsive'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">Sr. No.</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Category</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Demand Status</th>
                            <th scope="col">Predicted Demand(Next Month)</th>
                            <th scope="col">Move</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <ProductsOfSingleWarehouse wareId={dataadd.warehouseId}/>
                </table>
            </div>
        </div>
    </div>
      })}
    </>
  )
}


export default TotalWarehousesStock