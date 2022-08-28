import React from 'react'
import { useState, useEffect} from 'react'
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {ViewActions} from '../../store/view-slice'
function Login() {

  const dispatch=useDispatch();
  let navigate=useNavigate();

  //For Error Notification
  const [showError, setError]=useState("");

  useEffect(()=>{
    check();
  })

  const check=()=>{
    if(localStorage.getItem('token')!=null)
        {
            navigate("/stockportal")
        }
  }

  const pageStarting=()=>{
    dispatch(ViewActions.do_view_main())
    window.scrollTo(0, 0);
  }
    const [credentials, setCredentials]=useState({companyId:"", employeeId:"", password:""})
    //For Making User Logged In
    const validateInfoOfLogin=async (event)=>{
      event.preventDefault();
      if(credentials.companyId!="" && credentials.employeeId!="" && credentials.password!="")
      {
        const response=await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({companyId: credentials.companyId, employeeId: credentials.employeeId, password: credentials.password})
        })
        const json=await response.json();
        if(json.success)
        {
          localStorage.setItem('token', json.authtoken);
          navigate("/stockportal");
        }
        else{
          event.preventDefault();
          setError(json.error)
          document.getElementById("errorModal").click();
          setCredentials({companyId:"", employeeId:"", password:""});
        }
      }
      else{
        setError("The Given Credentials are not correct, Please try again with the right credentials");
        document.getElementById("errorModal").click();
      }
    }

    const onChange=(event)=>{
      setCredentials({...credentials, [event.target.name]: event.target.value})
    }

  return (
   <div className='bg-warning'>
      {pageStarting()}
      <div className='container' style={{ paddingLeft: '25%', paddingRight: '25%', paddingTop: '2.5%' }}>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title py-4"><strong>User Login Page</strong></h1>
            <div>
              <form onSubmit={validateInfoOfLogin}>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Company Id Number</strong></label>
                  <input type="number" name='companyId' value={credentials.companyId} onChange={onChange} style={{textAlign: 'center'}} className="form-control" id="companyId" />
                </div>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Your Id Number</strong></label>
                  <input type="number" name='employeeId' value={credentials.employeeId} onChange={onChange} style={{textAlign: 'center'}} className="form-control" id="employeeId" />
                </div>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Your Password</strong></label>
                  <input type="password" name='password' value={credentials.password} onChange={onChange} style={{textAlign: 'center'}} className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-secondary px-5">Submit</button>
              </form>
            </div>
          </div>
        </div>
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
      </div>
      <h2 className='pt-3'><strong><span>&#62;</span>For Changing Password Of Account </strong></h2>
      <Link type="button" to="/userchangepass" className="btn btn-success px-5 my-2 mx-3"><strong>Change Password</strong></Link>
      </div>
  )
}

export default Login