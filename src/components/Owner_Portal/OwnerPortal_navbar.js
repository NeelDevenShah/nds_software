import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
function OwnerPortal_navbar() {
  
  let navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('cmptoken');
    navigate("/companylogin")
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><strong>NDS SMA OWNER PORTAL</strong></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {/* Use active to show the live page */}
                            <Link className="nav-link mx-2" aria-current="page" to='/'>Home</Link>
                            <Link className="nav-link mx-2" to="/ownerportal">Dashboard</Link>
                            <Link className="nav-link mx-2" to="/ownerportal/logbook">Logbook</Link>
                            <Link className="nav-link mx-2" to="/ownerportal/productandcategories">Check Stock Details</Link>
                            <Link className="nav-link mx-2" to="/ownerportal/sales">Check Sales Orders</Link>
                            <Link className="nav-link mx-2" to="/ownerportal/purchase">Check Purchase Orders</Link>
                            <Link className="nav-link mx-2" to="/ownerportal/quotations">Check Quotations</Link>
                            <Link className="nav-link mx-2" to="/ownerportal/doneorders">Dispatched/Arrived Orders</Link>
                            <Link className="nav-link mx-2" to="/ownerportal/payments">Manage Payments</Link>
                            <button type="button" onClick={handleLogout} class="btn btn-outline-dark">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default OwnerPortal_navbar