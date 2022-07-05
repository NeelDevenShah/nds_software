import React from 'react'
import {useDispatch} from 'react-redux'
import { ViewActions } from '../../../store/view-slice'

import MangeSalesOrder from './cards/MangeSalesOrder'

function StockPortal_sales() {
  const dispatch=useDispatch();
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_stock())
  }
  return (
    <div className='bg-warning pb-5'>
    {pageStarting()}
    <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL SALES ORDERS</strong></h1>
    <MangeSalesOrder/>
  </div>
  )
}

export default StockPortal_sales
