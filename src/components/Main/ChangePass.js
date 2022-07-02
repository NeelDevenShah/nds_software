import React from 'react'
import { useDispatch } from 'react-redux'
import {ViewActions} from '../../store/view-slice'

function ChangePass() {
  const dispatch=useDispatch();
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_main_loggedIn())
  }
  return (
   <div className='bg-warning'>
      {pageStarting()}
      Change Password Page
    </div>
  )
}

export default ChangePass