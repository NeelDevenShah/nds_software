import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='bg-warning'>
      <div className='container' style={{ paddingLeft: '25%', paddingRight: '25%', paddingTop: '2.5%' }}>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title py-4"><strong>Login Page</strong></h1>
            {/* <h1><strong>Login</strong></h1> */}
            <div>
              <form>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Company Id Number :</strong></label>
                  <input type="number" style={{textAlign: 'center'}} className="form-control" id="companyId" />
                </div>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Your Id Number :</strong></label>
                  <input type="number" style={{textAlign: 'center'}} className="form-control" id="employeeId" />
                </div>
                <div className="mb-3">
                  <label className="form-label"><strong>Enter Your Password</strong></label>
                  <input type="password" style={{textAlign: 'center'}} className="form-control" id="password" />
                </div>
                <Link type="submit" to='/loginselection' className="btn btn-secondary px-5">Submit</Link>
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