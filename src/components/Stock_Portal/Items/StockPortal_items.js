import React from 'react'
import {useDispatch} from 'react-redux'
import { ViewActions } from '../../../store/view-slice'

import AddItemModal from './cards/AddItemModal'
import TotalItems from './cards/TotalItems'
import Dead_stock from '../dashboard/Genral_cards/Dead_stock'
import Months_top_selling from '../dashboard/Genral_cards/Months_top_selling'
import AddSameItemModal from './cards/AddSameItemModal'
import MinusSameItemModal from './cards/MinusSameItemModal'
import DeleteItemModal from './cards/DeleteItemModal'

function StockPortal_items() {
  const dispatch=useDispatch();
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_stock())
  }
  return (
    <div className='bg-warning pb-5'>
    <AddItemModal/>
    <AddSameItemModal/>
    <MinusSameItemModal/>
    <DeleteItemModal/>
    {pageStarting()}
    <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL VIEW/ADD PRODUCTS</strong></h1>
    <TotalItems/>
    <Months_top_selling/>
    <Dead_stock/>
  </div>
  )
}

export default StockPortal_items
