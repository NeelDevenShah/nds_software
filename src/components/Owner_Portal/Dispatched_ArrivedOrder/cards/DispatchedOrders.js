import React, {useEffect, useState} from 'react'

function DispatchedOrders() {
    
    //Function For Getting Data Of Dispatched Orders
    const [dispatchData, setDispatchData]=useState([]);
    const getDispatchedData=()=>{
        const response=await fetch('http://', {
            method: 'GET',
            headers:{

            }
        })
        const json=response.json();
        setDispatchData(json);
    }

  return (
    <div>
      
    </div>
  )
}

export default DispatchedOrders
