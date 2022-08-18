import React from 'react'
import {useDispatch} from 'react-redux'
import { useState } from 'react'
import { ViewActions } from '../../../store/view-slice'
import {useNavigate} from 'react-router-dom'
import MangeWarehouses from './cards/MangeWarehouses'

function StockPortal_managewarehouses() {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [data, setData]=useState()

  const pageStarting=()=>{
    dispatch(ViewActions.do_view_stock())
  }
  
  const check=()=>{
    if(localStorage.getItem('token')===null)
    {
      navigate("/login");
    }
  }

  const onChange=(event)=>{
    setData({...data, [event.target.name]: event.target.value})
  }

  const getData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getwarehouses', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    console.log("json")
  }

  return (
    <div className='bg-warning pb-5'>
      {check()}
      {pageStarting()}
      <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL MANAGE WAREHOUSES</strong></h1>
      <MangeWarehouses/>
    </div>
  )
}

export default StockPortal_managewarehouses
