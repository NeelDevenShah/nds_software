import React, {useEffect, useState} from 'react'
import ArrivedOrderProducts from './ArrivedOrderProducts'

function ArrivedOrders() {
    
    //Function For Getting Data Of Dispatched Orders
    const [arrivedData, setArrivedData]=useState([]);
    const [noData, setnoData]=useState("no");
    const getArrivedData=async()=>{
        const response=await fetch('http://localhost:5000/api/doneorders/getarriveddata', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'cmp-token': localStorage.getItem('cmptoken'),
            }
        })
        const json=await response.json();
        setArrivedData(json);
        if(json.length==0)
        {
          setnoData("yes");
        }
    }

    useEffect(()=>{
        getArrivedData();
    }, [])

    let i=1;
  return (
    <div className='container bg-white py-3 mt-4' style={{ borderRadius: '5px' }}>
      <h2 className='pt-3'><strong>Arrived Purchase Orders</strong></h2>
      <div className='row d-flex justify-content-center'>
        {noData=="yes"?<><hr/><p><strong>No Order Exists</strong></p></>:arrivedData.map((data) => {
          return <div key={data._id} className={`col-md-10 my-4`}>
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"><strong>Order Number #{i++}</strong></h4>
                <p class="card-text"><strong>{data.purchaseDealer}</strong><br/>Broker Name: <strong>{data.brokerName}</strong>, Payment Terms: <strong>{data.paymentTerm} Days</strong><br/>Comment: <strong>{data.comment}</strong>, purchaseOrderId: <strong>{data.purchaseOrderId}</strong></p>
                <div className='table-responsive'>
                  <table class="table table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">Product Category</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity No.'s</th>
                        <th scope="col">Per-Piece(<span>&#8377;</span>)</th>
                        <th scope="col">Arrived At</th>
                      </tr>
                    </thead>
                    <ArrivedOrderProducts purchaseOrderId={data.purchaseOrderId}/>
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

export default ArrivedOrders
