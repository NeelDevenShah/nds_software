import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {ViewActions} from '../../store/view-slice'
let selectElement;
let output;

function RegisterComp() {
  
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_main())
  }
  const dispatch=useDispatch();
  const [data, setData]=useState({name:"", emailId:"", country:"", shopNum:"", add2:"", city:"", state:"", pincode:"", companyId:"", password:"", repassword:""})
  const navigate=useNavigate();

  const submitCmpInfo= async (event)=>{
    event.preventDefault();
    if(data.password==data.repassword)
    {
      const response=await fetch('http://localhost:5000/api/registry/registercompany', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:data.name, emailId:data.emailId, country:data.country, shopNum:data.shopNum, add2:data.add2, city:data.city, state:data.state, pincode:data.pincode, companyId:data.companyId, password:data.password})
      })
      const json=await response.json();
      console.log(json)
      if(json.success)
      {
        //Navigate to new company creation successful page or to the company's portal
        navigate("/login")
      }
      else{
        //The error from api is comming than show it using model
      }
    }
    else{
      //Make remove the password and repassword's value
      console.log("Enter Right password, Both password does not matches")
    }
  }

  const onChange=(event)=>{
    setData({...data, [event.target.name]: event.target.value})
  }

  return (
    <div>
      {pageStarting()}
      <div className='bg-warning'>
        <div className='container' style={{ paddingLeft: '15%', paddingRight: '15%', paddingTop: '2.5%' }}>
          <div className="card">
            <div className="card-body">
              <h1 className="card-title py-4"><strong>Company Registration Page</strong></h1>
              <div>
                <form onSubmit={submitCmpInfo}>
                  <div className="mb-3">
                    <label className="form-label"><strong>Enter Company Name :</strong></label>
                    <input name='name' value={data.name} onChange={onChange} type="text" className="form-control" style={{textAlign: 'center'}} id="CompanyName" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Enter company email Id :</strong></label>
                    <input name='emailId' value={data.emailId} onChange={onChange} type="email" className="form-control" style={{textAlign: 'center'}} id="CompanyEmail" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Enter company Address Details:</strong></label>
                    <div className="dropdown">
                      <select name='country' value={data.country} onChange={onChange} id='selectCountry' className="btn btn-white dropdown-toggle my-3">
                        <option value='none'>Select Country</option>
                        <option value='India'>India</option>
                        <option value='Bangladesh'>Bangladesh</option>
                        <option value='Nepal'>Nepal</option>
                        <option value='China'>China</option>
                        <option value='USA'>USA</option>
                      </select>
                    </div>

                    <input name='shopNum' value={data.shopNum} onChange={onChange} type="text" placeholder='Shop / Plot Number' style={{ textAlign: 'center' }} className="form-control" id="ShopNumber" required minLength={1} maxLength={5} />
                    <input name='add2' value={data.add2} onChange={onChange} type="text" placeholder='Appartment, Unit, Building, Floor, etc..' style={{ textAlign: 'center' }} className="form-control my-2" id="AddressDescription" required minLength={6} />
                    <input name='city' value={data.city} onChange={onChange} type="text" placeholder='City' style={{ textAlign: 'center' }} className="form-control my-2" id="AddressCity" required />
                    <input name='state' value={data.state} onChange={onChange} type="text" placeholder='State/Province/Region' style={{ textAlign: 'center' }} className="form-control my-2" id="AddressState" required />
                    <input name='pincode' value={data.pincode} onChange={onChange} type="number" placeholder='Pin-Code' style={{ textAlign: 'center' }} className="form-control my-2" id="AddressPincode" required minLength={6} maxLength={6} />

                    <div className="mb-3">
                  <label className="form-label"><strong>Enter Company Id Number You Want To Select</strong></label>
                  <input name='companyId' value={data.companyId} onChange={onChange} type="number" style={{textAlign: 'center'}} className="form-control" id="password" />
                </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Enter Password For Your Account</strong></label>
                    <input name='password' value={data.password} onChange={onChange} type="password" style={{textAlign: 'center'}} className="form-control" id="password1" placeholder='Make The Password Strong And It Must Contain One Capital Letter, One Special Keyword'/>
                  </div>
                  <div className="mb-3">
                  <label className="form-label"><strong>Re-Enter Password For Your Account</strong></label>
                  <input name='repassword' value={data.repassword} onChange={onChange} type="password" style={{textAlign: 'center'}} className="form-control" id="password2" placeholder='Make Sure Password Is Same As That Of First One'/>
                </div>
                  {/* <Link type="submit" to='/loginselection' className="btn btn-secondary px-5">Submit</Link> */}
                  <button type="submit" className="btn btn-secondary px-5">Submit</button>

                  {/* <!-- Button trigger modal --> */}
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                  </button>

                  {/* <!-- Modal --> */}
                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        <h3 className='pt-3'><strong><span>&#62;</span>For Any Query Feel Free To Contact Us </strong></h3>
        <Link type="button" to="/contactus" className="btn btn-success px-5 my-2"><strong>Contact Us</strong></Link>
      </div>
    </div>
  )
}

export default RegisterComp