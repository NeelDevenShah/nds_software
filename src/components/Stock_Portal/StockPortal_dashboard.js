import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ViewActions } from '../../store/view-slice'
import Stock_Activity_Chart_Processor from './Stock_Activity_Chart_Processor'
import Stock_Details_Chart_Processor from './Stock_Details_Chart_Processor'

function StockPortal_dashboard() {
  const dispatch = useDispatch();
  const pageStarting = () => {
    dispatch(ViewActions.do_view_stock())
  }
  return (
    <div className='bg-warning'>
      {pageStarting()}
      <h1 className='py-5'><strong>STOCK MANAGMENT PORTAL DASHBOARD</strong></h1>
      <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
        <h2 className='pt-3'><strong>Sales Activity</strong></h2>
        <div className='container'>
          <div className='row'>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>288</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src='images/stockPortal_images/shopping-cart.png' style={{ width: '6.5%' }} /> Orders</h6>
                  <p class="card-text">To Be Ordered/Produced</p>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>54</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src='images/stockPortal_images/package.png' style={{ width: '6.5%' }} />Orders</h6>
                  <p class="card-text">To Be Packed</p>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>23</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src='images/stockPortal_images/cargo-ship.png' style={{ width: '7.5%' }} />Orders</h6>
                  <p class="card-text">To Be Shiped</p>
                </div>
              </div>
            </div>
            <Stock_Activity_Chart_Processor />
          </div>
        </div>
      </div>

      <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
        <h2 className='pt-3'><strong>Stock Details</strong></h2>
        <div className='container'>
          <div className='row'>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>2500</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src='images/stockPortal_images/active_storge_image.png' style={{ width: '6.5%' }} /> Quantity(s)</h6>
                  <p class="card-text">Active Stock</p>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>3000</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src='images/stockPortal_images/regular_stock_image.png' style={{ width: '6.5%' }} />Quantity(s)</h6>
                  <p class="card-text">Regular Stock</p>
                </div>
              </div>
            </div>

            <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title"><strong>1500</strong></h2>
                  <h6 class="card-subtitle mb-2 text-muted"><img src='images/stockPortal_images/dead_stock_image.png' style={{ width: '7.5%' }} />Quantity(s)</h6>
                  <p class="card-text">Dead Stock</p>
                </div>
              </div>
            </div>
            <Stock_Details_Chart_Processor />
          </div>
        </div>
      </div>

      <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
        <h2 className='pt-3'><strong>Sales Pending Orders</strong></h2>
        <div className='container'>
          <div className='row'>

            <div className='col md-5 my-5'>
           
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default StockPortal_dashboard
