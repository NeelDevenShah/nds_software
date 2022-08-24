import React from 'react'
import { useState, useEffect} from 'react'
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {ViewActions} from '../../store/view-slice'
function CmpLogin() {

  const dispatch=useDispatch();
  let navigate=useNavigate();

  useEffect(()=>{
    check();
  })

const check=()=>{
    if(localStorage.getItem('cmptoken')!=null)
        {
            navigate("/ownerportal")
        }
  }

  const pageStarting=()=>{
    dispatch(ViewActions.do_view_main())
  }
    const [credentials, setCredentials]=useState({companyId:"", password:""})

    //For Making Company Logged In
    const validateInfoOfLogin=async (event)=>{
      event.preventDefault();
    
      const response=await fetch('http://localhost:5000/api/auth/cmplogin', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({companyId: credentials.companyId, password: credentials.password})
      })
      const json=await response.json();
      if(json.success)
      {
        localStorage.setItem('cmptoken', json.authtoken);
        navigate("/ownerportal");
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
            <h1 className="card-title py-4"><strong>Company Login Page</strong></h1>
            {/* <h1><strong>Login</strong></h1> */}
            <div>
              <form onSubmit={validateInfoOfLogin}>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Company Id Number</strong></label>
                  <input type="number" name='companyId' value={credentials.companyId} onChange={onChange} style={{textAlign: 'center'}} className="form-control" id="companyId" />
                </div>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Company Password</strong></label>
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
      <h2 className='pt-3'><strong><span>&#62;</span>For Changing Password Of Company Account </strong></h2>
      <Link type="button" to="/cmpchangepass" className="btn btn-success px-5 my-2 mx-3"><strong>Change Password</strong></Link>
      </div>
  )
}

export default CmpLogin