import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'

import CategoryItems from './CategoryItems'
function WarehousesDetails() {
  //At the loading of the page this would run first
  useEffect(()=>{
    getCategoryData();
  }, [])

  const dataCat=[]
  const [catData, setCatData]=useState(dataCat)

  //For getting the data of the quotation
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
  return (
    <div className='container bg-white py-3 my-4' style={{ borderRadius: '5px' }}>
      <h2 className='pt-3'><strong>Category Wise Stock</strong></h2>
      <div className='container'>
        <div className='row'>
        {catData.map((cat)=>{
          return  <div key={cat._id} className={`col-md-4 my-4`}>
          <div class="card">
            <div class="card-body">
              <p class="card-text"><strong>{cat.pcname}</strong></p>
              <hr />
              <div className='container'>
              {/* It is calling another method for getting the products at the given warehouse by the help of the id */}
              <CategoryItems id={cat._id} key={cat._id}/>
              </div>
            </div>
          </div>
        </div>
        })}

        </div>
      </div>
    </div>
  )
}

export default WarehousesDetails