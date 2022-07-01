import React from 'react'
import { Link } from 'react-router-dom'
let selectElement;
let output;
function RegisterComp() {
  function OnSubmitGo() {
    document.preventDefault();
    selectElement = document.querySelector('#selectCountry');
    output = selectElement.value;
    console.log(output)

    //Now add the followig data in the

    //Method of getting the data repetatively, without the clicking
    // setInterval(function() {
    //   selectElement = document.querySelector('#selectCountry');
    // output=selectElement.value;
    // console.log(output)
    // }, 2000);
  }
  return (
    <div>
      <div className='bg-warning'>
        <div className='container' style={{ paddingLeft: '15%', paddingRight: '15%', paddingTop: '2.5%' }}>
          <div className="card">
            <div className="card-body">
              <h1 className="card-title py-4"><strong>Company Registration Page</strong></h1>
              {/* <h1><strong>Login</strong></h1> */}
              <div>
                <form onSubmit={OnSubmitGo}>
                  <div className="mb-3">
                    <label className="form-label"><strong>Enter Company Name :</strong></label>
                    <input type="text" className="form-control" style={{textAlign: 'center'}} id="CompanyName" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Enter company email Id :</strong></label>
                    <input type="email" className="form-control" style={{textAlign: 'center'}} id="CompanyEmail" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Enter company Address Details:</strong></label>
                    <div className="dropdown">
                      <select id='selectCountry' className="btn btn-white dropdown-toggle my-3">
                        <option value='none'>Select Country</option>
                        <option value='India'>India</option>
                        <option value='Bangladesh'>Bangladesh</option>
                        <option value='Nepal'>Nepal</option>
                        <option value='China'>China</option>
                        <option value='USA'>USA</option>
                      </select>
                    </div>

                    <input type="text" placeholder='Shop / Plot Number' style={{ textAlign: 'center' }} className="form-control" id="ShopNumber" required minLength={1} maxLength={5} />
                    <input type="text" placeholder='Appartment, Unit, Building, Floor, etc..' style={{ textAlign: 'center' }} className="form-control my-2" id="AddressDescription" required minLength={6} />
                    <input type="text" placeholder='City' style={{ textAlign: 'center' }} className="form-control my-2" id="AddressCity" required />
                    <input type="text" placeholder='State/Province/Region' style={{ textAlign: 'center' }} className="form-control my-2" id="AddressState" required />
                    <input type="number" placeholder='Pin-Code' style={{ textAlign: 'center' }} className="form-control my-2" id="AddressPincode" required minLength={6} maxLength={6} />

                    <div className="mb-3">
                  <label className="form-label"><strong>Enter Company Id Number You Want To Select</strong></label>
                  <input type="number" style={{textAlign: 'center'}} className="form-control" id="password" />
                </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label"><strong>Enter Password For Your Account</strong></label>
                    <input type="password" style={{textAlign: 'center'}} className="form-control" id="password1" placeholder='Make The Password Strong And It Must Contain One Capital Letter, One Special Keyword'/>
                  </div>
                  <div className="mb-3">
                  <label className="form-label"><strong>Re-Enter Password For Your Account</strong></label>
                  <input type="password" style={{textAlign: 'center'}} className="form-control" id="password2" placeholder='Make Sure Password Is Same As That Of First One'/>
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