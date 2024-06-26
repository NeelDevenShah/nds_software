import React, { useState, useEffect} from 'react'
import plus from '../../../../images/stockPortal_images/plus.png'
import Context from '../../../../Context'
import {useContext} from 'react'
function MangeWarehouses() {
  // const context=useContext(Context);
  // const {editId}=context;
  
  //At the loading of the page this would run first
  useEffect(()=>{
    getwareData()
  }, [])

  //For Error Notification
  const [showError, setError]=useState("");

  const wareh=[];
  const [whdata, setWhdata]=useState(wareh)
  const [nwhdata, setnwhdata]=useState({wname:"", shopNum:"", add2:"", city:"", state:"", country:"", pincode:""})

  //Method for getting the data of the warehouse
  const getwareData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getwarehouses', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    setWhdata(json);
  }

  //Method for deleting the warehouse
  const deleteWarehouse=async(delId)=>{
    const response=await fetch(`http://localhost:5000/api/registry/deletewarehouse/${delId}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    delId=0;
    const json=await response.json();
    if(json.success)
    {
      getwareData();
    }
    else{
      setError(json.error);
        document.getElementById("errorModal").click();
    }
  }

  //Method for adding the warehouse
  const addNewWarehouse=async()=>{
    if(nwhdata.wname=="" || nwhdata.shopNum=="" || nwhdata.add2=="" || nwhdata.city=="" || nwhdata.state=="" || nwhdata.country=="" || nwhdata.pincode=="")
    {
      setError("Please Enter Right Information");
      document.getElementById("errorModal").click();
    }
    else{
      const response=await fetch(`http://localhost:5000/api/registry/registerwarehouse`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({wname: nwhdata.wname, shopNum: nwhdata.shopNum, add2: nwhdata.add2, city:nwhdata.city, state:nwhdata.state, country:nwhdata.country, pincode:nwhdata.pincode})
        })
        const json=await response.json();
        if(json.success)
        {
          getwareData();
        }
        else{
          setError(json.error);
            document.getElementById("errorModal").click();
        }
    }
  }

  const onChange=(event)=>{
    setnwhdata({...nwhdata, [event.target.name]: event.target.value})
  }
  //Here the i is for the new warehouse number and delId for which warehouse to delete
  let delId=0, i=0;
  return (
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      {/* DeleteWarehouse Modal */}
      <div class="modal fade" id="DeleteWareModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Warehouse Delete Conformation Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once The Warehouse Is Deleted Than All The Stock Will Be Move To The Default Warehouse And The Stock Should Be Rearanged To Another Warehouse, And This Warehouse Will Not BE Available Any More
          </div>
          <div class="modal-footer">
            <button type="button" onClick={delId=0} class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{deleteWarehouse(delId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
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
        <h5 class="modal-title" id="staticBackdropLabel">Manage Warehouse Page Error</h5>
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
      {/* Add New Warehouse Modal */}
      <div>
            <div class="modal fade" id="AddWareModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add New Warehouse</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label"><h6>Enter New Warehouse Name</h6></label>
                                    <input type="text" name='wname' value={nwhdata.wname} onChange={onChange} class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Unique Name Than Exists One' />
                                    <label for="exampleInputEmail1" class="form-label"><h6>Enter Shop Number</h6></label>
                                    <input type="email" name='shopNum' value={nwhdata.shopNum} onChange={onChange} class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Example: B/12, 23' />
                                    <label for="exampleInputEmail1" class="form-label"><h6>Locality, Estate</h6></label>
                                    <input type="email" name='add2' value={nwhdata.add2} onChange={onChange} class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Example: Mothihari Estate, near canal' />
                                    <label for="exampleInputEmail1" class="form-label"><h6>Enter City</h6></label>
                                    <input type="email" name='city' value={nwhdata.city} onChange={onChange} class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Example: Ahmedabad' />
                                    <label for="exampleInputEmail1" class="form-label"><h6>Enter State</h6></label>
                                    <input type="email" name='state' value={nwhdata.state} onChange={onChange} class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Example: Gujrat' />
                                    <label for="exampleInputEmail1" class="form-label"><h6>Enter Country</h6></label>
                                    <input type="email" name='country' value={nwhdata.country} onChange={onChange} class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Example: India' />
                                    <label for="exampleInputEmail1" class="form-label"><h6>Enter Pincode</h6></label>
                                    <input type="email" name='pincode' value={nwhdata.pincode} onChange={onChange} class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Example: 380050' />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" onClick={addNewWarehouse} class="btn btn-secondary" data-bs-dismiss="modal">Add Warehouse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  */}
      <h2 className='pt-3'><strong>Your Warehouses</strong></h2>
      <div className='container'>
        <div className='row'>
          {whdata.map((wh) => {
            return <div key={wh._id} className={`col-md-4 my-4`}>
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title"><strong>#{i++} {wh.wname}</strong></h4>
                    {console.log(wh.wname)}
                    {wh.wname!="Default Warehouse"?<p class="card-text">{wh.shopNum} {wh.add2}, {wh.city}, {wh.state}, {wh.country}</p>:<p>Default</p>}
                    <hr />
                    <button type="button" onClick={()=>{delId=wh._id}} class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteWareModal">Delete</button>
                  </div>
                </div>
              </div>
          })}

          <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddWareModal"><img src={plus} width='55'></img><strong>Add New Warehouse</strong></button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MangeWarehouses