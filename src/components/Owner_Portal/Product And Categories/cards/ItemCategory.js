import React, { useState } from 'react'
import plus from '../../../../images/stockPortal_images/plus.png'
import { useEffect} from 'react'

function Sales_Activity() {

  //For Fetching Data Of Category
  const [catData, setCatData]=useState([])
  const getCategoryData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getcategoriesforcmp', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'cmp-token': localStorage.getItem('cmptoken')
      },
    })
    const json=await response.json();
    setCatData(json)
  }

  useEffect(()=>{
    getCategoryData();
  }, [])

  return (
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      <h2 className='pt-3'><strong>Product Categories Of Company</strong></h2>
      <div className='container'>
        <div className='row'>

          {catData.map((cat) => {
            return <div key={cat._id} className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title"><strong>{cat.pcname}</strong></h4>
                  </div>
              </div>
            </div>
          })}

        </div>
      </div>
    </div>
  )
}

export default Sales_Activity