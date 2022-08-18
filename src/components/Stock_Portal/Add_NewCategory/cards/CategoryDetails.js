import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'

import CategoryItems from './CategoryItems'
function WarehousesDetails() {

  useEffect(()=>{
    getCategoryData();
  }, [])

  const dataCat=[]
  const [catData, setCatData]=useState(dataCat)

  const getCategoryData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getcategories', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    setCatData(json)
  }

  const item=[];
  const [catitem, setCatitem]=useState(item);

    const getItemData=async(id)=>{
        console.log("h")
        const response=await fetch(`http://localhost:5000/api/getdata/getcategorywisestock/62fc0d425ba9fdcd6fd90f75`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        })
        const json=await response.json();
        setCatitem(json);
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