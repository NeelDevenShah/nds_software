import React from 'react'
import {useDispatch} from 'react-redux'
import {ViewActions} from '../../../store/view-slice'

import ItemCategory from './cards/ItemCategory';
import CategoryDetails from './cards/CategoryDetails';

function StockPortal_addnewcategory() {
  const dispatch=useDispatch();
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_stock())
  }
  return (
    <div className='bg-warning pb-5'>
    {pageStarting()}
    <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL ADD/VIEW PRODUCT CATEGORY</strong></h1>
    <ItemCategory/>
    <CategoryDetails/>
</div>
  )
}

export default StockPortal_addnewcategory
