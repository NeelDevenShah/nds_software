import React from 'react'
import { useDispatch } from 'react-redux'
import { ViewActions } from '../../../store/view-slice'
import {useNavigate} from 'react-router-dom'
import ManageQuotations from './cards/MangeQuotations';

function StockPortal_managequotations() {
  let delprodId=0;
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

  //BASIC UTILITY FUNCTIONS THAT ARE USED IN THE INTERFILE OPERATIONS
  const getDataOfProductById=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/quotation/getproductdetailsbyid/${id}`, {
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const proddata=await response.json();

  }
  const editproductofquot=async(id)=>{

  }

  return (
    <div className='bg-warning pb-5'>
      {check()}
      {pageStarting()}
      <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL MANAGE QUOTATIONS</strong></h1>
      <ManageQuotations getDataOfProductById={getDataOfProductById} editproductofquot={editproductofquot}/>
    </div>
  )
}

export default StockPortal_managequotations
