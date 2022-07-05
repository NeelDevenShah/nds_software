import React, { useState } from 'react'
import AddWarehouseModal from './AddWarehouseModal'
import DeleteWarehouse from './DeleteWarehouseModal'

import plus from '../../../../images/stockPortal_images/plus.png'

function MangeWarehouses() {
  let i=1;
  const wareData = [
    {
      'address': 'A1 punkal Estate, Ahmedabad'
    },
    {
      'address': 'B1 Ghanshyam Estate, Tamil-Nadu'
    },
    {
      'address': 'C1 Ample Estate, Maninagar'
    },
  ]
  const [ware, setWare] = useState(wareData)
  return (
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      <AddWarehouseModal/>
      <DeleteWarehouse/>
      <h2 className='pt-3'><strong>Your Warehouses</strong></h2>
      <div className='container'>
        <div className='row'>

          {ware.map((wh) => {
            return <div className={`col-md-4 my-4`}>
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title"><strong>Warehouse   {i++}</strong></h4>
                    <p class="card-text">{wh.address}</p>
                    <hr />
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteWareModal">Delete</button>
                  </div>
                </div>
              </div>
          })}

          <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddWareModal"><img src={plus} width='55'></img><strong>Add New Warehouse</strong></button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MangeWarehouses