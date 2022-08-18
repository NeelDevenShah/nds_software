import React, { useState } from 'react'

import plus from '../../../../images/stockPortal_images/plus.png'
import add_item_image from '../../../../images/stockPortal_images/add_item_image.png'

import AddItemModal from './AddItemModal'
import AddQuotation from './AddQuotationModal'
import EditQuotationModal from './EditQuotationModal'

function ManageQuotations() {
  let i=1;
  const quotationComp=[
    {
      'name': 'Dinesh Traders',
    },
    {
      'name': 'Patel Traders',
    },
    {
      'name': 'shah Traders',
    }
  ]
  const [Qname, QsetName]=useState(quotationComp)
  const DataList=[
    {
      'PCategory': 'Pen',
      'PItem': 'Black Ball Pen',
      'PQty': '2000',
      'Price': '2'
    },
    {
      'PCategory': 'Pencil',
      'PItem': 'Lead Pencil',
      'PQty': '1500',
      'Price': '3'
    },
    {
      'PCategory': 'Rubber',
      'PItem': 'Round Eraser',
      'PQty': '5000',
      'Price': '3'
    },
  ]
  const [QData, setQData]=useState(DataList)
  return (
    // Staring
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      {/* AddSalesModal */}
      <div class="modal fade" id="AddToSalesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Adding Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once It Been Added To The Sales Order, The Action Cannot Be Reverted From Here
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-secondary">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* DeleteQuotationModal */}
      <div class="modal fade" id="DeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once It Is Been Deleted, It Cannot Be Recovered
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-secondary">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      <AddItemModal/>
      <AddQuotation/>
      <EditQuotationModal/>

      <h2 className='pt-3'><strong>Your Given Quotations</strong></h2>
      <div className='row d-flex justify-content-center'>

        {Qname.map((QCompnayName)=>{
          return  <div className={`col-md-5 my-4`}>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title"><strong>Quotation #{i++}</strong></h4>
              <p class="card-text">{QCompnayName.name}</p>
              <div className='table-responsive'>
              <table class="table table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Product Category</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity No.'s</th>
                    <th scope="col">Per-Piece(<span>&#8377;</span>)</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>

                {QData.map((data)=>{
                  return  <tr>
                    <td>{data.PCategory}</td>
                    <td>{data.PItem}</td>
                    <td>{data.PQty}</td>
                    <td>{data.Price}</td>
                    <td> <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#EditQuotationModal">Edit</button></td>
                    <td> <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#DeleteModal">Delete</button></td>
                  </tr>
                })}

                </tbody>
              </table>
              </div>
              <p>Total Quotation Amount: <strong>5000</strong></p>
              <hr/>
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddToQuotationModal"><img src={add_item_image} width='120'></img></button>
              <hr />
              <button type="button" class="btn btn-success mx-2" data-bs-toggle="modal" data-bs-target="#AddToSalesModal">Add To Sales Order</button>
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteModal">Delete</button>
              {/* <!-- Button trigger modal --> */}
            </div>
          </div>
        </div>
        })}

        <div className={`col-md-5 my-4`}>
          <div class="card">
            <div class="card-body">
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddQuotationModal"><img src={plus} width='55'></img><strong> Add New Quotation</strong></button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageQuotations
