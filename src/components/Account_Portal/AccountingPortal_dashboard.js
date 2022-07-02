import React from 'react'
import {useDispatch} from 'react-redux'
import { ViewActions } from '../../store/view-slice';
function AccountingPortal_dashboard() {
  const dispatch=useDispatch();
  const pageStarting=()=>{
    dispatch(ViewActions.do_view_account())
  }
  return (
    <div>
        {pageStarting()}
      AccountingPortal_dashboard
    </div>
  )
}

export default AccountingPortal_dashboard