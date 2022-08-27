import React, { useState, useEffect} from 'react'
import add_item_image from '../../../../images/stockPortal_images/add_item_image.png'
import plus from '../../../../images/stockPortal_images/plus.png'
import cancel from '../../../../images/stockPortal_images/cancel.png'

function TotalItems() {
    let i=1;
    //For Error Notification
    const [showError, setError]=useState("");

    //Function(Primary) For Getting Details Of All Producrs Present In Warehouses
    const [whsdata, setWhsdata]=useState([])
    const getproductInWareDetails=async()=>{
        const response=await fetch('http://localhost:5000/api/getdata/getallstockproductsofcompany', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json=await response.json();
        setWhsdata(json);
    }

    //Function(Secondary) For Getting Data Of Categories For DropBox
    const [categories, setCategory] = useState([])
    const getcatData=async()=>{
        const response=await fetch('http://localhost:5000/api/getdata/getcategories', {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json=await response.json();
        setCategory(json);
    }

    //Function(Secondary) For Getting Warehouse Data For Addition Of Product
    const [wData, setWData]=useState([])
    const getWareData=async()=>{
        const response=await fetch('http://localhost:5000/api/getdata/getwarehouses', {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json=await response.json();
        setWData(json);
    }

    //Function(Primary) For Adding New Product
    const [newprodCategoryId, setnewprodCategoryId]=useState(-1);
    const [newprodName, setNewprodName]=useState("");
    const addNewProduct=async()=>{
    if(newprodCategoryId==-1 || newprodName=="")
    {
      setError("Please Enter Right Information");
      document.getElementById("errorModal").click();
    }
    else
    {
            let prodCatName="";
            categories.map((catData)=>{
            if(catData.categoryId==newprodCategoryId)
            {
                prodCatName=catData.pcname;
            }
            })
            const response=await fetch('http://localhost:5000/api/addnew/addnewproduct', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({categoryId:newprodCategoryId, productcategory:prodCatName, productName:newprodName})
            })
            const json=await response.json();
            if(json.success)
            {
                getproductInWareDetails();
            }
            else{
                // console.log("Product Does Not Been Added, Error");
                setError(json.eror)
                document.getElementById("errorModal").click();
            }
        }
    }

    //Function(Primary) For Adding More Product To Existing Product
    const [addmoreId, setaddmoreId]=useState(-1);
    const [addprodWareId, setaddprodWareId]=useState(-1);
    const [mqty, setmqty]=useState(0);
    const addMoreProduct=async(id)=>{
        if(addprodWareId==-1 || parseInt(mqty)==0)
        {
          setError("Please Enter Right Information");
          document.getElementById("errorModal").click();
        }
        else{
            const response=await fetch(`http://localhost:5000/api/addnew/addproduct/${id}`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({prodWarehouseId:addprodWareId, qty:parseInt(mqty)})
            })
            const json=await response.json();
            if(json.success)
            {
                getproductInWareDetails();
            }
            else{
                // console.log("Product Does Not Added Successfully, Error");
                setError(json.eror)
                document.getElementById("errorModal").click();
            }
        }
    }

    //Function For Deleting Product From All Warehouse
    const [deleteId, setdeleteId]=useState(-1);
    const deleteFromAll=async(id)=>{
        const response=await fetch(`http://localhost:5000/api/addnew/deleteproduct/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json=await response.json();
        if(json.success)
        {
            getproductInWareDetails();
        }
        else{
            setError(json.eror)
            document.getElementById("errorModal").click();
        }
    }

    useEffect(()=>{
        getproductInWareDetails();
        getcatData();
        getWareData();
    }, [])

    return (
        <div className='container bg-white py-4  my-4' style={{ borderRadius: '5px' }}>
            {/* AddItemModal */}
            <div class="modal fade" id="AddItemModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <div class="mb-3">
                                    <label class="form-label">Select Product Category</label>

                                    <div class="dropdown">
                                        <select class="form-select form-select-sm mb-3" onClick={(event)=>{setnewprodCategoryId(event.target.value)}} aria-label=".form-select-lg example">
                                            <option value={-1}>Select</option>
                                            {categories.map((cat) => {
                                                return <option value={cat.categoryId}>{cat.pcname}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                </div>
                                <label class="form-label">Enter New Product's Name</label>
                                <input type="text" class="form-control text-center" id="newItem" name="newProdName" onChange={(event)=>{setNewprodName(event.target.value)}} required />
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>{addNewProduct()}} class="btn btn-secondary" data-bs-dismiss="modal">Add</button>
                    </div>
                </div>
            </div>
        </div>
            {/*  */}
            {/* Add More Product Modal */}
            <div class="modal fade" id="AddSameItemModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add More Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="mb-3">
                                    <label class="form-label">Select The Warehouse Where You Want To Add Product</label>
                                    <div class="dropdown">
                                        <select class="form-select form-select-sm mb-3" onClick={(event)=>{setaddprodWareId(event.target.value)}} aria-label=".form-select-lg example">
                                            <option value={-1}>Select</option>
                                            {wData.map((data) => {
                                                return <option value={data.warehouseId}>{data.wname}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            <div class="mb-3">
                                <label class="form-label">Enter Quantity That You Want To Add</label>
                                <input type="number" class="form-control text-center" onChange={(event)=>{setmqty(event.target.value)}} id="newItem" name="newItem" required />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>{addMoreProduct(addmoreId)}} class="btn btn-secondary" data-bs-dismiss="modal">Add</button>
                    </div>
                </div>
            </div>
        </div>
            {/*  */}
            {/* DeleteWarehouse Modal */}
      <div class="modal fade" id="DeleteItemModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Warehouse Delete Conformation Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once Product Is Been Deleted, The Step Cannot Be Reverted Back And Product From All The Warehouses Will Be Deleted</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{deleteFromAll(deleteId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
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
        <h5 class="modal-title" id="staticBackdropLabel">Add/View Page Error</h5>
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
            <h2 className='py-3'><strong>Total Products</strong></h2>
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
                                <th scope="col">In warehouses</th>
                                <th scope="col">Add More</th>
                                <th scope="col">Delete Product From All Warehouses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {whsdata.map((data)=>{
                                return <tr>
                                 <th scope="row">{i++}</th>
                                 <td>{data.productName}</td>
                                 <td>{data.productcategory}</td>
                                 <td>{data.quantity}</td>
                                 <td>{data.demand}</td>
                                 <td>{data.predictedDemand}</td>
                                 <td>{data.inWarehouses}</td>
                                 <td><button type="button" onClick={()=>{setaddmoreId(data._id)}} class="btn" data-bs-toggle="modal" data-bs-target="#AddSameItemModal"><img src={plus} width='25'></img></button></td>
                                 <td><button type="button" onClick={()=>{setdeleteId(data._id)}} class="btn" data-bs-toggle="modal" data-bs-target="#DeleteItemModal"><img src={cancel} width='25'></img></button></td>
                               </tr>
                            })}
                        </tbody>
                    </table>
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddItemModal"><img src={add_item_image} width='140'></img></button>
                </div>
            </div>
        </div>
    )
}

export default TotalItems
