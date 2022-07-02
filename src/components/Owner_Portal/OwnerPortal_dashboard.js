import React from 'react'
import { useDispatch } from 'react-redux'
import {ViewActions} from '../../store/view-slice'

function OwnerPortal_dashboard() {
  const dispatch=useDispatch();
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_owner())
  }
  return (
    <div>
      {pageStarting()}
      OwnerPortal_dashboard
    </div>
  )
}

export default OwnerPortal_dashboard
