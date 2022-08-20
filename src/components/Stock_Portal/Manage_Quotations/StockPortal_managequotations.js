import React from 'react'
import { useDispatch } from 'react-redux'
import { ViewActions } from '../../../store/view-slice'
import {useNavigate} from 'react-router-dom'
import ManageQuotations from './cards/MangeQuotations';

function StockPortal_managequotations() {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const pageStarting = () => {
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
      <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL MANAGE QUOTATIONS</strong></h1>
      <ManageQuotations/>
    </div>
  )
}

export default StockPortal_managequotations
