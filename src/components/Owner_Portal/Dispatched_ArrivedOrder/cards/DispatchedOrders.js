import React, {useEffect, useState} from 'react'
import DispatchedOrderProduct from './DispatchedOrderProduct'

function DispatchedOrders() {
    
    //Function For Getting Data Of Dispatched Orders
    const [dispatchData, setDispatchData]=useState([]);
    const getDispatchedData=async()=>{
        const response=await fetch('http://localhost:5000/api/doneorders/getdispatcheddata', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'cmp-token': localStorage.getItem('cmptoken'),
            }
        })
        const json=await response.json();
        setDispatchData(json);
    }

    useEffect(()=>{
        getDispatchedData();
    }, [])
    
    let i=1;
  return (
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      <h2 className='pt-3'><strong>Dispatched Sales Orders</strong></h2>
      <div className='row d-flex justify-content-center'>
        {dispatchData.map((data) => {
          return <div key={data._id} className={`col-md-10 my-4`}>
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"><strong>Order Number #{i++}</strong></h4>
                <p class="card-text"><strong>{data.salesDealer}</strong><br/>Broker Name: <strong>{data.brokerName}</strong>, Payment Terms: <strong>{data.paymentTerm} Days</strong><br/>Comment: <strong>{data.comment}</strong>, SalesOrderId: <strong>{data.SalesOrderId}</strong></p>
                <div className='table-responsive'>
                  <table class="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">Product Category</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity No.'s</th>
                        <th scope="col">Per-Piece(<span>&#8377;</span>)</th>
                        <th scope="col">Dispatched From</th>
                      </tr>
                    </thead>
                    <DispatchedOrderProduct SalesOrderId={data.SalesOrderId}/>
                  </table>
                </div>
                <p>Total Order Amount: <strong>{data.totalAmount}</strong></p>
              </div>
            </div>
          </div>
        })}
      </div>
      </div>
  )
}

export default DispatchedOrders
