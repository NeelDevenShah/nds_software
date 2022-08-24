import React from 'react'
import { useDispatch } from 'react-redux'
import {ViewActions} from '../../store/view-slice'
import {useNavigate} from 'react-router-dom'

function ChangePass() {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();

  
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_main_loggedIn())
  }

  return (
   <div className='bg-warning'>
      {pageStarting()}
      Company Change Password Page
    </div>
  )
}

export default ChangePass