import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {ViewActions} from '../../store/view-slice'
import {useNavigate} from 'react-router-dom'

function LoginSelection() {
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const pageStarting=()=>{
        dispatch(ViewActions.do_view_main_loggedIn())
      }

    const check=()=>{
        if(localStorage.getItem('token')==null)
        {
            navigate("/login")
        }
    }

    return (
        <div>
            {check()}
            {pageStarting()}
            <div className='bg-warning py-3'>
                <h1 className='pt-3'><strong>Login Selection Page</strong></h1>
                <div className='container'>
                    <h2 className='pt-3'><strong>Choose Which Portal Do You Want To Use :</strong></h2>
                    <div className='container pt-3'>
                    
                        <Link type="button" to="/stockportal" className="btn btn-success px-5 my-2 py-3 mx-3"><strong>COMPANY'S STOCK PORTAL</strong></Link>
                        <Link type="button" to="/accountingportal" className="btn btn-success px-5 my-2 py-3 mx-3"><strong>COMPANY'S ACCOUNTING PORTAL</strong></Link>
                        <Link type="button" to="/ownerportal" className="btn btn-success px-5 my-2 py-3 mx-3"><strong>COMPANY'S OWNER'S PORTAL</strong></Link>
                        <Link type="button" to="/dealerportal" className="btn btn-success px-5 my-2 py-3 mx-3"><strong>COMPANY'S DELAR'S PORTAL</strong></Link>
                        <Link type="button" to="/" className="btn btn-success px-5 my-2 py-3 mx-3"><strong>Go Back</strong></Link>
                    </div>
                    <h3 className='pt-5'><strong><span>&#62;</span> For Making Access To Non-Permited Portal Contact Company's Owner</strong></h3>
                    <h3 className='pt-3'><strong><span>&#62;</span>For Making Change In The Password Of Your Account </strong></h3>
                    <Link type="button" to="/changepassword" className="btn btn-success px-5 my-2 mx-3"><strong>Change Password</strong></Link>
                    <h3 className='pt-3'><strong><span>&#62;</span>For Any Query Feel Free To Contact Us </strong></h3>
                    <Link type="button" to="/contactus" className="btn btn-success px-5 my-2 mx-3"><strong>Contact Us</strong></Link>
                </div>
            </div>
        </div>
    )
}

export default LoginSelection