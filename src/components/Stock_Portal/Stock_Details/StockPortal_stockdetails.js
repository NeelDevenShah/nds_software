import React from 'react'

import { useDispatch } from 'react-redux'
import { ViewActions } from '../../../store/view-slice'

import Stock_details from '../dashboard/Genral_cards/Stock_details'
import TotalWarehousesStock from './cards/TotalWarehousesStock'
import WarehousesDetails from './cards/WarehousesDetails'
import SingleWhStock from './cards/SinglelWhStock'

function StockPortal_stockdetails() {
    const dispatch = useDispatch();
    const pageStarting = () => {
        dispatch(ViewActions.do_view_stock())
    }
    return (
        <div className='bg-warning pb-5'>
            {pageStarting()}
            <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL AVAILABLE STOCK DETAILS</strong></h1>
            <Stock_details />
            <TotalWarehousesStock/>
            <WarehousesDetails/>
            <SingleWhStock/>
        </div>
    )
}

export default StockPortal_stockdetails
