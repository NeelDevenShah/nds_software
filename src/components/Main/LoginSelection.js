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
        window.scrollTo(0, 0);
      }
    return (
        <div>
            {pageStarting()}
            <div className='bg-warning py-3'>
            <br/>
                <h1 className='pt-3'><strong>Login Selection</strong></h1>
                <div className='container'>
                    <h2 className='pt-3'><strong>Choose Which Portal Do You Want To Use :</strong></h2>
                    <div className='container pt-3'>
                    
                        <Link type="button" to="/login" className="btn btn-success px-5 my-2 py-3 mx-3"><strong>COMPANY'S STOCK PORTAL</strong></Link>
                        <Link type="button" to="/companylogin" className="btn btn-success px-5 my-2 py-3 mx-3"><strong>COMPANY'S OWNER'S PORTAL</strong></Link>
                        <Link type="button" to="/" className="btn btn-success px-5 my-2 py-3 mx-3"><strong>Go Back</strong></Link>
                    </div>
                    <br/><hr/><br/>
                    <h2 className='pt-3'><strong><span>&#62;</span> If Not Have Registered Company Yet, Do Now</strong></h2>
                    <Link type="button" to="/register" className="btn btn-success px-5 my-2 mx-3"><strong>Register company Now And Make Bussiness Hussle Free And Speedy</strong></Link>
                    <h3 className='pt-3'><strong><span>&#62;</span>For Any Query Feel Free To Contact Us </strong></h3>
                    <Link type="button" to="/contactus" className="btn btn-success px-5 my-2 mx-3"><strong>Contact Us</strong></Link>
                </div>
            </div>
        </div>
    )
}

export default LoginSelection