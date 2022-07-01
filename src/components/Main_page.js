import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {ViewActions} from '../store/view-slice';

function Main_page() {
        var audio=new Audio('click_sound.mp3');
    return (
        <div className='bg-warning pb-5'>
              {document.onclick=function(){audio.play()}}
            {/* Sarting of navbar */}
            {/* Completion of the navbar */}
            <img src="main_page_image.png" className='w-25 mt-2'></img>
            {/* Start of the company Intro*/}
            <div className='container pb-4'>
                <div className='pt-5 pt-4'>
                    <h1><strong>NDS SOFTWARE & DESGINING</strong></h1>
                    <div className='py-2'>
                        <h2><strong>Presents</strong></h2>
                    </div>
                    <h1><strong>Stock Managment And Accounting Software</strong></h1>
                </div>
            </div>
            {/* Ending of the company Intro*/}
            <div className='container'>
                <hr />
            </div>
            {/* Starting of the Link buttons */}
            <div className='container'>
                <Link to="/login" type="button" className="btn btn-success px-5 mt-2"><strong>Quick Login</strong></Link><br />
                <Link to="/contactus" type="button" className="btn btn-success px-5 mt-3"><strong>Contact Our Customer Executive</strong></Link><br />
                <Link to="/register" type="button" className="btn btn-success px-5 mt-4"><strong>Register company Now And Make Bussiness Hussle Free And Speedy</strong></Link><br />
            </div>
            {/* Ending of the Link buttons */}
            <div className='container'>
                <hr />
            </div>
            {/* Starting of the website intro */}
            <div className='container pb-5 pt-3'>
                <h2 className='pb-5'><strong>Facilities And Service Provided By Us Are :</strong></h2>
                <ul className="list-group list-group-flush">
                    
                    <li className="list-group-item"><strong>Speacial Owner's Portal</strong></li>
                    <li className="list-group-item"><strong>Speacial Delar's Portal</strong></li>
                    <li className="list-group-item"><strong>Special Accounting Portal</strong></li>
                    <li className="list-group-item"><strong>Special Stock Mangment Portal</strong></li>
                    <li className="list-group-item"><strong>Special Stock demand calculating portal</strong></li>
                    <li className="list-group-item"><strong>Secure and Safe, And No fear of losing the data</strong></li>
                    <li className="list-group-item"><strong>Manage company's live stock anywhere and anytime 24X7</strong></li>
                    <li className="list-group-item"><strong>And Many More.....</strong></li>
                </ul>
                <h2 className='pt-5'><strong>Benifits Of The Cloud Based Inventory Managment System Are :</strong></h2>
            </div>
            {/* Starting of Profit explaining cards */}
            <div className='container'>
            <div className='row'>
              
            <div className={`col-md-4 my-4`}>
                <div className="card">
                    <img src="operation_efficency_image.png" style={{width: '98.8%'}} className="card-img-top py-5" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title my-2"><strong>Operation Efficiency</strong></h5>
                    </div>
                </div>
                </div>

                <div className={`col-md-4 my-4`}>
                <div className="card">
                    <img src="profit_maximization_image.png" className="card-img-top" alt="..." />
                    <div className="card-body mx-4">
                        <h5 className="card-title mt-4"><strong>Profit Maximization</strong></h5>
                    </div>
                </div>
                </div>

                <div className={`col-md-4 my-4`}>
                <div className="card">
                    <img src="customer_satisfaction_image.png" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title mt-4"><strong>Customer Satisfaction</strong></h5>
                    </div>
                </div>
                </div>

      
            <div className='col-md-4 my-4'>
                <div className="card">
                    <img src="speedy_managment_image.jpg" style={{width: '98.30%'}} className="card-img-top w-80" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title"><strong>Speedy Managment</strong></h5>
                    </div>
                </div>
                </div>

                <div className='col-md-4 my-4'>
                <div className="card">
                    <img src="instant_stock_status.png" className="card-img-top" alt="..." />
                    <div className="card-body mx-4">
                        <h5 className="card-title mt-4"><strong>Instant Stock Status Tracking</strong></h5>
                    </div>
                </div>
                </div>

                <div className='col-md-4 my-4'>
                <div className="card">
                    <img src="demand_predictor_image.jpg" style={{width: '99.15%'}} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title mt-4"><strong>Demand Predictors</strong></h5>
                    </div>
                </div>
                </div>

                </div>
        </div>
            {/* Ending of Profit explaining cards */}
            {/* Ending of the website intro */}
        </div>
    )
}

export default Main_page
