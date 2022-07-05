import React from 'react'
import {useDispatch} from 'react-redux'
import { ViewActions } from '../../../store/view-slice'

import MangeWarehouses from './cards/MangeWarehouses'

function StockPortal_managewarehouses() {
  const dispatch=useDispatch();
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_stock())
  }
  return (
    <div className='bg-warning pb-5'>
      {pageStarting()}
      <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL MANAGE WAREHOUSES</strong></h1>
      <MangeWarehouses/>
    </div>
  )
}

export default StockPortal_managewarehouses
