import React from 'react'
import { useDispatch } from 'react-redux'
import {ViewActions} from '../../../store/view-slice'
import Sales_Activity from '../../Stock_Portal/dashboard/Genral_cards/Sales_Activity';
import Stock_details from '../../Stock_Portal/dashboard/Genral_cards/Stock_details'
import Months_top_selling from '../../Stock_Portal/dashboard/Genral_cards/Months_top_selling'
import Dead_stock from '../../Stock_Portal/dashboard/Genral_cards/Dead_stock'
import CmpDetail from './cards/CmpDetail';
import UserOfCompany from './cards/UserOfCompany'
import DeletedCmp from './cards/DeletedCmp'
import { useNavigate } from 'react-router-dom';
function OwnerPortal_dashboard() {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_owner())
  }

  const Check=()=>{
    if(localStorage.getItem('cmptoken')==null)
    {
      navigate("/companylogin")
    }
  }

  return (
    <div className='bg-warning pb-5'>
      {Check()}
      {pageStarting()}
      <h1 className='py-5'><strong>OWNER PORTAL DASHBOARD</strong></h1>
      <CmpDetail/>
      <UserOfCompany/>
      <Sales_Activity/>
      <Stock_details/>
      <Months_top_selling/>
      <Dead_stock/>
      <DeletedCmp/>
    </div>
  )
}

export default OwnerPortal_dashboard
