import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {ViewActions} from '../../../store/view-slice'
import {useNavigate} from 'react-router-dom'

import DispatchedOrders from './cards/DispatchedOrders'
import ArrivedOrders from './cards/ArrivedOrders'
function DispatchedArrivedOrders() {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    //Checking
    const pageStarting=()=>{
        dispatch(ViewActions.do_view_owner())
        window.scrollTo(0, 0);
    }
    const Check=()=>{
        if(localStorage.getItem('cmptoken')==null)
        {
            navigate("/companyloign")
        }
    }
  return (
    <div className='bg-warning pb-5'>
      {Check()}
      {pageStarting()}
      <h1 className='py-5'><strong>OWNER PORTAL DISPATCHED/ARRIVED ORDERS</strong></h1>
      <DispatchedOrders/>
      <ArrivedOrders/>
    </div>
  )
}

export default DispatchedArrivedOrders
