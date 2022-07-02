import React from 'react'
import { useDispatch } from 'react-redux'
import {ViewActions} from '../../store/view-slice'

function DealerPortal_dashboard() {
  const dispatch=useDispatch();
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_dealer())
  }
  return (
    <div>
      {pageStarting()}
      DealerPortal_dashboard
    </div>
  )
}

export default DealerPortal_dashboard
