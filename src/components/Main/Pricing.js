import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {ViewActions} from '../../store/view-slice'

function Pricing() {
    const dispatch=useDispatch();
    const pageStarting=()=>{
        dispatch(ViewActions.do_view_main())
      }
    return (
        <div className='bg-warning'>
            {pageStarting()}
            <h1 className='pt-3'><strong>Pricing</strong></h1>
            <div className='container'>
                <h2 className='pt-3'><strong>Plans From Where You Business Starts Growing.</strong></h2>
                <h5 className='mb-5'>Get just what you need to go further, faster.</h5>
                <h3 className='py-3'><strong>Compare Plans</strong></h3>

                <div className='container'>
                    <div className='row'>

                    <div className={`col-md-4`}>
                        <div className="card mx-5 my-4">
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Budget Plan</strong></h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">An item <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A second item   <strong><span style={{color: 'red'}}>&#215;</span></strong></li>
                                    <li className="list-group-item">A third item    <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">An item <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A second item   <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A third item    <strong><span style={{color: 'red'}}>&#215;</span></strong></li>
                                    <li className="list-group-item">An item <strong><span style={{color: 'red'}}>&#215;</span></strong></li>
                                    <li className="list-group-item">A second item   <strong><span style={{color: 'red'}}>&#215;</span></strong></li>
                                    <li className="list-group-item"><strong>At <span>&#8377;500/month (inc. GST)</span></strong></li>
                                </ul>
                        </div>
                        </div>

                        <div className={`col-md-4 my-4  `}>
                        <div className="card mx-5">
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Basic Plan</strong></h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">An item <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A second item   <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A third item    <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">An item <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A second item   <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A third item    <strong><span style={{color: 'red'}}>&#215;</span></strong></li>
                                    <li className="list-group-item">An item <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A second item   <strong><span style={{color: 'red'}}>&#215;</span></strong></li>
                                    <li className="list-group-item"><strong>At <span>&#8377;750/month (inc. GST)</span></strong></li>
                                </ul>
                        </div>
                        </div>

                        <div className={`col-md-4 my-4`}>
                        <div className="card mx-5">
                                <div className="card-body">
                                    <h5 className="card-title"><strong>Platinium Plan</strong></h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">An item <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A second item   <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A third item    <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">An item</li>
                                    <li className="list-group-item">A second item   <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A third item    <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">An item <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item">A second item   <strong><span style={{color: 'green'}}>&#10003;</span></strong></li>
                                    <li className="list-group-item"><strong>At <span>&#8377;1000/month (inc. GST)</span></strong></li>
                                </ul>
                        </div>
                        </div>
                        <h5 className='pt-3'><strong><span>&#62;</span> If Not Satisfied Than <strong>15</strong> Days Money Back Guarantee</strong></h5>
                    </div>
                </div>
        <hr/>
            </div>
            <h2 className='pt-3'><strong><span>&#62;</span> If Not Have Registered Company Yet, Do Now</strong></h2>
                    <Link type="button" to="/register" className="btn btn-success px-5 my-2 mx-3"><strong>Register company Now And Make Bussiness Hussle Free And Speedy</strong></Link>
            <Link type="button" to="/contactus" className="btn btn-success px-5 my-2"><strong>Contact Us</strong></Link>
        </div>
    )
}

export default Pricing