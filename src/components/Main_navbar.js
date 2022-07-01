import React from 'react'
import { Link } from 'react-router-dom'
function Main_navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><strong>NDS SMA SOFTWARE</strong></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {/* Use active to show the live page */}
                            <Link className="nav-link" aria-current="page" to='/'>Home</Link>
                            <Link className="nav-link" to="/pricing">Pricing</Link>
                            <Link className="nav-link" to="/aboutus">About Us</Link>
                            <Link className="nav-link" to="/contactus">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default Main_navbar