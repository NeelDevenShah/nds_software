import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { ViewActions } from '../../../store/view-slice'
import {useNavigate} from 'react-router-dom'
import ItemCategory from './cards/ItemCategory'
import CategoryDetails from './cards/CategoryDetails'
import TotalWarehousesStock from './cards/TotalWarehousesStock'
import WarehousesDetails from './cards/WarehousesDetails'
import SinglelWhStock from './cards/SinglelWhStock'
function OwnerPortal_productAndCategories() {
  
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
            navigate("/companylogin")
        }
    }

    return (
        <div className='bg-warning pb-5'>
        {Check()}
        {pageStarting()}
        <h1 className='py-5'><strong>OWNER PORTAL CHECK STOCK DETAILS</strong></h1>
        <ItemCategory/>
        <CategoryDetails/>
        {/* All the below one works on the api of the user make system to make them work on cmp api */}
        <TotalWarehousesStock/>
        <WarehousesDetails/> {/*Work Tobe done*/}
        <SinglelWhStock/>
    </div>
  )
}

export default OwnerPortal_productAndCategories
