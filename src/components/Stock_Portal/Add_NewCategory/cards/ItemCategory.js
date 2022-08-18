import React, { useState } from 'react'
import plus from '../../../../images/stockPortal_images/plus.png'
import { useEffect} from 'react'

function Sales_Activity() {

  useEffect(()=>{
    getCategoryData();
  }, [])

  const dataCat=[]
  const [catData, setCatData]=useState(dataCat)
  const [newcatdata, setNewcatdata]=useState({pcname:""})

  const getCategoryData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getcategories', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    setCatData(json)
  }

  const addnewcategory=async()=>{
    let newcategotyid=0;
    catData.map((cat)=>{
      newcategotyid=cat.categoryId
    })
    const response=await fetch('http://localhost:5000/api/addnew/addcategory', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({categoryId: newcategotyid+1, pcname: newcatdata.pcname})
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("new category added successfull");
      getCategoryData();
    }
    else{
      console.log("error"+json)
    }
  }

  const deletecategory=async(delId)=>{
    const response=await fetch(`http://localhost:5000/api/addnew/deletecategory/${delId}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    delId=0;
    getCategoryData();
  }

  const onChange=(event)=>{
    setNewcatdata({...newcatdata, [event.target.name]: event.target.value})
  }

  let delId=0;
  return (
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      {/* DeleteCategotyModal */}
      <div class="modal fade" id="DeleteCatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once It Is Been Deleted, It Cannot Be Recovered
          </div>
          <div class="modal-footer">
            <button type="button" onClick={delId=0} class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{deletecategory(delId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* AddCategoryModal  */}
      <div class="modal fade" id="AddCatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Category</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter New Category Name:</label>
                            <input name='pcname' value={newcatdata.pcname} onChange={onChange} type="email" class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Unique Category Than That Exists' />
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={()=>{addnewcategory()}} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Add Category</button>
                      </div>
                    </div>
                  </div>
                </div>
      {/*  */}
      <h2 className='pt-3'><strong>Stock Details According To Product Category</strong></h2>
      <div className='container'>
        <div className='row'>

          {catData.map((cat) => {
            return <div key={cat._id} className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title"><strong>{cat.pcname}</strong></h4>
                  <hr />
                  <button type="button" onClick={()=>{delId=cat._id}} class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteCatModal">Delete</button>
                </div>
              </div>
            </div>
          })}

          <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddCatModal"><img src={plus} width='55'></img><strong>Add New Category</strong></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sales_Activity