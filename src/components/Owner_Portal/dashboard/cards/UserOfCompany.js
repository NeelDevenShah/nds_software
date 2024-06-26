import React, { useState } from 'react'
import plus from '../../../../images/stockPortal_images/plus.png'
import { useEffect} from 'react'

function Sales_Activity() {

  //For Error Notification
  const [showError, setError]=useState("");

  //For Fetching Data Of User
  const [userData, setUserData]=useState([])
  const getUserData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getcompanyuser', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'cmp-token': localStorage.getItem('cmptoken')
      },
    })
    const json=await response.json();
    setUserData(json)
  }

  //Function For Adding New User Of Company
  const [newUserData, setNewUserdata]=useState({name:"", password:"", repassword:""})
  const onChange=(event)=>{
    setNewUserdata({...newUserData, [event.target.name]: event.target.value})
  }
  const addnewUser=async()=>{
    if(newUserData.name=="" || newUserData.password=="" || newUserData.repassword=="")
    {
      setError("Please Enter Right Information");
      document.getElementById("errorModal").click();
    }
    else{
      if(newUserData.password==newUserData.repassword)
      {
        const response=await fetch('http://localhost:5000/api/registry/registeruser', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'cmp-token': localStorage.getItem('cmptoken')
        },
          body: JSON.stringify({name: newUserData.name, password: newUserData.password})
        })
        const json=await response.json();
        if(json.success)
        {
          getUserData();
        }
        else{
          setError("New User Does Not Added, Due To Error Please Try Again With Unique Name Or Contact Us");
          document.getElementById("errorModal").click();
        }
      }
      else{
        setError("Password Does Not Matches, Try Again");
        document.getElementById("errorModal").click();
      }
    }
  }

  //For Deletion Of Of Company's User
  const [delId, setDelId]=useState(-1);
  const deleteUser=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/registry/deleteuser/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'cmp-token': localStorage.getItem('cmptoken')
      },
    })
    const json=await response.json();
    if(json.success)
    {
      getUserData();
    }
    else{
      setError("User Does Not Deleted, Try Again Or Contact Us");
      document.getElementById("errorModal").click();
    }
  }

  useState(()=>{
    getUserData();
  })

  return (
    <div className='container bg-white py-3 my-4' style={{ borderRadius: '5px' }}>
      {/* DeleteUserModal */}
      <div class="modal fade" id="DeleteUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once User Been Deleted, It Cannot Be Reverted, Be Cautions While Deleting
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{deleteUser(delId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* NewUserModal  */}
      <div class="modal fade" id="AddUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New User For Company</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter New User Name:</label>
                            <input type="text" name='name' value={newUserData.name} onChange={onChange} class="form-control text-center" id="newusername1" aria-describedby="emailHelp" placeholder='Enter Unique User Name Than Exists One' />
                            <label for="exampleInputEmail1" class="form-label">Enter Password For New User:</label>
                            <input type="password" name='password' value={newUserData.password} onChange={onChange} class="form-control text-center" id="newuserpassword1" aria-describedby="emailHelp" placeholder='Enter Strong Password' />
                            <label for="exampleInputEmail1" class="form-label">Enter re-Password For User:</label>
                            <input type="password" name='repassword' value={newUserData.repassword} onChange={onChange}class="form-control text-center" id="newuserRepassword" aria-describedby="emailHelp" placeholder='Enter Same As Above Entered Password' />
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={()=>{addnewUser()}} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Add User</button>
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
        <h5 class="modal-title" id="staticBackdropLabel">Owner Portal's Page Error</h5>
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
      <h2 className='py-3'><strong>Permited Users Of Company's Portal</strong></h2>
      <div className='container'>
        <div className='row'>

          {userData.map((user) => {
            return <div key={user._id} className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><strong>{user.name}</strong></h5>
                  <p>EmployeeId: {user.employeeId}</p>
                  <hr />
                  <button type="button" onClick={()=>{setDelId(user._id)}} class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteUserModal">Delete</button>
                </div>
              </div>
            </div>
          })}

          <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddUserModal"><img src={plus} width='55'></img><strong>Add New User</strong></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sales_Activity