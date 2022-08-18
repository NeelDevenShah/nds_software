import React from 'react'
import {useDispatch} from 'react-redux'
import {ViewActions} from '../../../store/view-slice'

import ItemCategory from './cards/ItemCategory';
import CategoryDetails from './cards/CategoryDetails';
import {useNavigate} from 'react-router-dom'
function StockPortal_addnewcategory() {
  
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
    <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL ADD/VIEW PRODUCT CATEGORY</strong></h1>
    <ItemCategory/>
    <CategoryDetails/>
</div>
  )
}

export default StockPortal_addnewcategory
