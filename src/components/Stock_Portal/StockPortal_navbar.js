import React from 'react'
import {Link} from 'react-router-dom'

function StockPortal_navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><strong>NDS SMA STOCK MANAGMNET</strong></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {/* Use active to show the live page */}
                            <Link className="nav-link"to='/'>Home</Link>
                            <Link className="nav-link" to="/stockportal">Dashboard</Link>
                            <Link className="nav-link" to="/stockportal/products">View/Add Products</Link>
                            <Link className="nav-link" to="/stockportal/sales">Sales Order</Link>
                            <Link className="nav-link" to='/stockportal/purchase'>Purchase Order</Link>
                            <Link className="nav-link" to="/stockportal/ordermanagment">Order Managment</Link>
                            <Link className="nav-link" to="/stockportal/stockdetails">Available Stock Details</Link>
                            <Link className="nav-link" to="/stockportal/managequotations">Manage Quotations</Link>
                            <Link className="nav-link" to="/stockportal/addnewcategory">Add/View Product Category</Link>
                            <Link className="nav-link" to='/stockportal/managewarehouses'>Manage Warehouses</Link>
                            <button type="button" class="btn btn-outline-dark">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default StockPortal_navbar
