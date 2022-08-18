import React from 'react'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {ViewActions} from '../../store/view-slice'
function Login() {
  
  const dispatch=useDispatch();
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_main())
  }
    const [credentials, setCredentials]=useState({companyId:"", employeeId:"", password:""})
    let navigate=useNavigate();

    const validateInfoOfLogin=async (event)=>{
      event.preventDefault();
    
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
        navigate("/loginselection");
      }
      else{
        //The error is comming than remove fields value acc. to error
        event.preventDefault();
        console.log(json.error)
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
            <h1 className="card-title py-4"><strong>Login Page</strong></h1>
            {/* <h1><strong>Login</strong></h1> */}
            <div>
              <form onSubmit={validateInfoOfLogin}>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Company Id Number :</strong></label>
                  <input type="number" name='companyId' value={credentials.companyId} onChange={onChange} style={{textAlign: 'center'}} className="form-control" id="companyId" />
                </div>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Your Id Number :</strong></label>
                  <input type="number" name='employeeId' value={credentials.employeeId} onChange={onChange} style={{textAlign: 'center'}} className="form-control" id="employeeId" />
                </div>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Your Password</strong></label>
                  <input type="password" name='password' value={credentials.password} onChange={onChange} style={{textAlign: 'center'}} className="form-control" id="password" />
                </div>
                {/* <Link type="submit" to='/loginselection' className="btn btn-secondary px-5">Submit</Link> */}
                <button type="submit" className="btn btn-secondary px-5">Submit</button>
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Launch demo modal
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        ...
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
      <h2 className='pt-3'><strong><span>&#62;</span> If Not Have Registered Company Yet, Do Now</strong></h2>
      <Link type="button" to="/register" className="btn btn-success px-5 my-2 mx-3"><strong>Register company Now And Make Bussiness Hussle Free And Speedy</strong></Link>
      <Link type="button" to="/contactus" className="btn btn-success px-5 my-2"><strong>Contact Us</strong></Link>
    </div>
  )
}

export default Login