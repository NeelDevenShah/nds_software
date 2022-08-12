import React, { useState } from 'react'

import plus from '../../../../images/stockPortal_images/plus.png'
import add_item_image from '../../../../images/stockPortal_images/add_item_image.png'

import DeleteSalesModal from './DeleteSalesModal'
import EditSalesModal from './EditSalesModal'
import AddSalesModal from './AddSalesModal'
import AddItemModal from './AddItemModal'
import DispatchedAllModal from './DispatchedAllModal'
import ManageStatusModal from './ManageStatusModal'

//In this page, when the order is been added the status and dispatching form should be in the to be planned, And that can be changed from the order status managment portal
function MangeSalesOrder() {
  const quotationComp = [
    {
      // In date use mm/dd/yyyy format
      'orderId': '1',
      'name': 'Dinesh Traders',
      'delivery_date': '07/09/2022',
      'comments': 'urgent',
      'deal_broker': 'Neel',
      'payment_term': "1 Month"
    },
    {
      'orderId': '2',
      'name': 'Patel Traders',
      'delivery_date': '07/10/2022',
      'comments': 'Its okay to be delayed',
      'deal_broker': 'Neel',
      'payment_term': "2 Month"
    },
    {
      'orderId': '3',
      'name': 'Shah Traders',
      'delivery_date': '07/26/2022',
      'comments': 'urgent',
      'deal_broker': 'Neel',
      'payment_term': "6 Days",
      'partial_d_done': 'w1'
      //Hence the delivery from the w1 will show zero
    }
  ]
  const [Qname, QsetName] = useState(quotationComp)
  const DataList = [
    {
      'PCategory': 'Pen',
      'PItem': 'Black Ball Pen',
      'PQty': '2000',
      'Price': '2',
      'status': 'To Be Ordered/Produced',
      'd_location': 'w1, w2, w3'
    },
    {
      'PCategory': 'Pencil',
      'PItem': 'Lead Pencil',
      'PQty': '1500',
      'Price': '3',
      'status': 'To Be Packed',
      'd_location': 'w1'
    },
    {
      'PCategory': 'Rubber',
      'PItem': 'Round Eraser',
      'PQty': '5000',
      'Price': '3',
      'status': 'To Be Shiped',
      'd_location': 'To Be Planed'
    },
    {
      'PCategory': 'Rubber',
      'PItem': 'Round Eraser',
      'PQty': '5000',
      'Price': '3',
      'status': 'To Be Planned',
      'd_location': 'To Be Planed'
    },
  ]
  const [QData, setQData] = useState(DataList)
  const DateDifference = (Odate) => {
    //Use the mm/dd/yyy format
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yyyy = now.getFullYear();
    var nowDate = mm + '/' + dd + '/' + yyyy;

    const date1 = new Date(nowDate);
    const date2 = new Date(Odate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays + " days");
    return diffDays
  }
  return (
    // Staring
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      <DeleteSalesModal />
      <EditSalesModal />
      <AddSalesModal />
      <AddItemModal />
      <DispatchedAllModal/>
      <ManageStatusModal/>

      <h2 className='pt-3'><strong>Your Sales Orders</strong></h2>
      <div className='row d-flex justify-content-center'>

        {Qname.map((QCompnay) => {
          return <div className={`col-md-10 my-4`}>
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"><strong>Order Number #{QCompnay.orderId}</strong></h4>
                <p class="card-text"><strong>{QCompnay.name}</strong>, Days Left For Dispatch: <strong>{DateDifference(QCompnay.delivery_date)}</strong><br/>Broker Name: <strong>{QCompnay.deal_broker}</strong>, Payment Terms: <strong>{QCompnay.payment_term}</strong><br/>Comment: <strong>{QCompnay.comments}</strong></p>
                <div className='table-responsive'>
                  <table class="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">Product Category</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity No.'s</th>
                        <th scope="col">Per-Piece(<span>&#8377;</span>)</th>
                        {/* <th scope="col" className='py-3'>Status</th> */}
                        <th scope="col">Dispatching Status</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Manage Status</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>

                      {QData.map((data) => {
                        return <tr>
                          <td>{data.PCategory}</td>
                          <td>{data.PItem}</td>
                          <td>{data.PQty}</td>
                          <td>{data.Price}</td>
                          {/* <td>{data.status}</td> */}
                          <td>{data.d_location}</td>
                          <td> <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#EditSalesModal">Edit</button></td>
                          <td> <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#ManageStatusModal">Manage</button></td>
                          <td> <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#DeleteSalesModal">Delete</button></td>
                        </tr>
                      })}

                    </tbody>
                  </table>
                </div>
                <p>Total Order Amount: <strong>5000</strong></p>
                <hr />
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddProductToSales"><img src={add_item_image} width='120'></img></button>
                <hr />
                <button type="button" class="btn btn-success mx-2" data-bs-toggle="modal" data-bs-target="#DispatchSalesModal">All Order Dispatched</button>
                <button type="button" class="btn btn-info mx-2" data-bs-toggle="modal" data-bs-target="#EditSalesOrder">Edit</button>
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteSalesModal">Delete</button>
                {/* <!-- Button trigger modal --> */}
              </div>
            </div>
          </div>
        })}

        <div className={`col-md-6 my-4`}>
          <div class="card">
            <div class="card-body">
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddSalesModal"><img src={plus} width='55'></img><strong> Add Sales Order</strong></button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MangeSalesOrder
