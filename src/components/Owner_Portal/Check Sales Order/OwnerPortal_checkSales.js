import React from 'react'
import {useDispatch} from 'react-redux'
import { ViewActions } from '../../../store/view-slice';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import SalesProduct from './cards/SalesProduct'
function OwnerPortal_checkSales() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  //Checking
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_owner())
  }
  const Check=()=>{
    if(localStorage.getItem('cmptoken')==null)
    {
      navigate("/companylogin")
    }
  }

  //Function For Getting Data Of Sales Order
  const [sData, setSData]=useState([]);
  const getSOrderInfo=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/salesordersforcmp', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'cmp-token': localStorage.getItem('cmptoken')
      }
    })
    const json=await response.json();
    console.log(json)
    setSData(json);
  }

  //Function(Secondary) for getting the difference of the current date and the main dispatch date
  const DateDifference = (Odate) => {
    //Use the mm/dd/yyy format
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yyyy = now.getFullYear();
    var nowDate = mm + '/' + dd + '/' + yyyy;

    const date1 = new Date(nowDate);
    const date2 = new Date(Odate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays + " days");
    return diffDays
  }

  useEffect(()=>{
    getSOrderInfo();
  }, [])

  let i=0;
  return (
    <div className='bg-warning pb-5'>
      {Check()}
      {pageStarting()}
      <h1 className='py-5'><strong>OWNER PORTAL SALES ORDERS</strong></h1>    
      <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      <h2 className='pt-3'><strong>Your Sales Orders</strong></h2>
      <div className='row d-flex justify-content-center'>
        {sData.map((QCompnay) => {
          return <div key={QCompnay._id} className={`col-md-10 my-4`}>
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"><strong>Order Number #{i++}</strong></h4>
                <p class="card-text"><strong>{QCompnay.salesDealer}</strong>, Days Left For Dispatch: <strong>{DateDifference(QCompnay.mainDispatchDate)}</strong><br/>Broker Name: <strong>{QCompnay.brokerName}</strong>, Payment Terms: <strong>{QCompnay.paymentTerm} Days</strong><br/>Comment: <strong>{QCompnay.comment}</strong>, SalesOrderId: <strong>{QCompnay.SalesOrderId}</strong></p>
                <div className='table-responsive'>
                  <table class="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">Product Category</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity No.'s</th>
                        <th scope="col">Per-Piece(<span>&#8377;</span>)</th>
                        <th scope="col">Dispatching Status</th>
                        <th scope='col'>Dispatching From</th>
                      </tr>
                    </thead>
                    <SalesProduct SalesOrderId={QCompnay.SalesOrderId}/>
                  </table>
                </div>
                <p>Total Order Amount: <strong>{QCompnay.totalAmount}</strong></p>
              </div>
            </div>
          </div>
        })}
      </div>
      </div>
    </div>
  )
}

export default OwnerPortal_checkSales
