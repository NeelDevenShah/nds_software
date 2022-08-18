import React from 'react'
import {useDispatch} from 'react-redux'
import { ViewActions } from '../../../store/view-slice'
import {useNavigate} from 'react-router-dom'
import MangeSalesOrder from './cards/MangeSalesOrder'

function StockPortal_sales() {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const pageStarting=()=>{
    dispatch(ViewActions.do_view_stock())
  }
  
  const check=()=>{
    if(localStorage.getItem('token')===null)
    {
      navigate("/login");
    }
  }
  
  return (
    <div className='bg-warning pb-5'>
    {check()}
    {pageStarting()}
    <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL SALES ORDERS</strong></h1>
    <MangeSalesOrder/>
  </div>
  )
}

export default StockPortal_sales
