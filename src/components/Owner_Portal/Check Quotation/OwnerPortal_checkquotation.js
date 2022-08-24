import React from 'react'
import { useDispatch } from 'react-redux';
import { ViewActions } from '../../../store/view-slice';
import { useState, useEffect} from 'react';
import QuotationProduct from './cards/QuotationProduct';
import { useNavigate } from 'react-router-dom';

function OwnerPortal_checkquotation() {
  
    const dispatch=useDispatch();
    const navigate=useNavigate();

    //Checking
    const pageStarting=()=>{
        dispatch(ViewActions.do_view_owner())
    }
    const Check=()=>{
        if(localStorage.getItem('cmptoken')==null)
        {
            navigate("/companylogin");
        }
    }

  //Function For Getting Data Of Quotations
  const [quotationData, setQuotationData]=useState([]);
  const getQuotationData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getquotationsforcmp', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'cmp-token': localStorage.getItem('cmptoken')
        }
    })
    const json=await response.json();
    setQuotationData(json);
  }

  useEffect(()=>{
    getQuotationData();
  }, [])

    let i=0;
    return (
        <div className='bg-warning pb-5'>
        <h1 className='py-5'><strong>OWNER PORTAL QUOTATIONS</strong></h1>
        <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
             {Check()}
        {pageStarting()}
      <h2 className='pt-3'><strong>Your Given Quotations</strong></h2>
    <div className='row d-flex justify-content-center'>
        {quotationData.map((QcmpDetail)=>{
          return  <div key={QcmpDetail._id} className={`col-md-6 my-4`}>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title"><strong>Quotation #{i++}</strong></h4>
              <p class="card-text"><strong>Dealer: {QcmpDetail.dealer}, QuotationId: {QcmpDetail.quotationId}</strong></p>
              <div className='table-responsive'>
              <table class="table table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Product Category</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity No.'s</th>
                    <th scope="col">Per-Piece(<span>&#8377;</span>)</th>
                  </tr>
                </thead>
                <QuotationProduct key={QcmpDetail._id} quotationId={QcmpDetail.quotationId}/>
              </table>
              </div>
              <p>Total Quotation Amount: <strong>{QcmpDetail.totalAmount}</strong></p>  
            </div>
          </div>
        </div>
        })}
      </div>
    </div>
    </div>
  )
}

export default OwnerPortal_checkquotation
