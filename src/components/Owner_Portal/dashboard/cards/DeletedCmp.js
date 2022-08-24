import React from 'react'
import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

function DeletedCmp() {
    //Function For Deleting Company's Account
    const [deldata, setdelData]=useState({pass:"", repass:"", msg:""})
    const onChange=(event)=>{
        setdelData({...deldata, [event.target.name]: event.target.value});
    }
    const deleteCmp=async()=>{
        if(deldata.msg=="confirm" && deldata.pass==deldata.repass)
        {
            const response=await fetch('http://localhost:5000/api/registry/deletecompany', {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'cmp-token': localStorage.getItem('cmptoken'),
                'password': deldata.pass
            }
        })
            const json=await response.json();
            if(json.success)
            {
                localStorage.removeItem('cmptoken');
                document.location.reload();
            }
            else{
                console.log("Company Deletion Failed, Error")
            }
        }
        else{
            console.log("Enter Right Credentials");
        }
    }
  return (
    <div className='container bg-white py-3 my-4' style={{ borderRadius: '5px' }}>
      {/* DeleteCategotyModal */}
      <div class="modal fade" id="DeletecmpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once Company Been Deleted, Data Cannot Be Reverted, Be Cautions While Deleting
            <hr/>
                <form>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Enter Password Of Company:</label>
                      <input type="password" name='pass' value={deldata.pass} onChange={onChange} class="form-control text-center" id="newusername" aria-describedby="emailHelp" placeholder='Enter Unique User Name Than Exists One' />
                      <label for="exampleInputEmail1" class="form-label">Re-Enter Password Of Company</label>
                      <input type="password" name='repass' value={deldata.repass} onChange={onChange} class="form-control text-center" id="newuserpassword" aria-describedby="emailHelp" placeholder='Enter Strong Password' />
                      <label for="exampleInputEmail1" class="form-label">Type Confirm To Delete Company</label>
                      <input type="password" name='msg' value={deldata.msg} onChange={onChange}class="form-control text-center" id="newuserrepassword" aria-describedby="emailHelp" placeholder='Enter Same As Above Entered Password' />
                    </div>
                </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{deleteCmp()}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      <h2 className='py-3'><strong>Delete Company's Account*</strong></h2>
      <hr/>
      <h4 style={{color: 'red'}}><strong>Once, The Account Being Deleted All The Infomation Related To Company Will Be Deleted And Nothing Can Be Retrived Back, If There Is Any Problem In Software Than Please Feel Free To Contact Us Before Deleting Account We Will Be Happy To Help....</strong></h4>
      <Link type="button" to="/contactus" className="btn btn-success px-5 my-2 mx-3"><strong>Contact Us</strong></Link>
      <button type="button" className="btn btn-success px-5 my-2 mx-3" data-bs-toggle="modal" data-bs-target="#DeletecmpModal"><strong>Delete Account</strong></button>
    </div>
  )
}

export default DeletedCmp
