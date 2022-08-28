import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ViewActions } from '../../../store/view-slice'

import Sales_Activity from '../dashboard/Genral_cards/Sales_Activity'
import Stock_details from '../dashboard/Genral_cards/Stock_details'
import Months_top_selling from '../dashboard/Genral_cards/Months_top_selling'
import Dead_stock from '../dashboard/Genral_cards/Dead_stock'

import Sales_pending_orders from './cards/Sales_pending_orders'
import Purchase_pending_orders from './cards/Purchase_pending_orders'
import {useNavigate} from 'react-router-dom'

function StockPortal_dashboard() {
  
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const pageStarting = () => {
    dispatch(ViewActions.do_view_stock())
    window.scrollTo(0, 0);
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
      {/* <Image/> */}
      <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL DASHBOARD</strong></h1>
      <Sales_Activity/>
      <Stock_details/>
      <Sales_pending_orders/>
      <Purchase_pending_orders/>
      <Months_top_selling/>
      <Dead_stock/>
    </div>
  )
}

export default StockPortal_dashboard
