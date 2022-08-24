import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import buildings from '../../../../images/ownerPortal_images/buildings.png'

function CmpDetail() {
    //Function For Getting Data Of Company
    const [cmpData, setcmpData]=useState([]);
    const getCmpDetails=async()=>{
        const response=await fetch('http://localhost:5000/api/getdata/getcompanydetails', {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'cmp-token': localStorage.getItem('cmptoken')
            },
        })
        const json=await response.json();
        setcmpData(json);
    }

    useEffect(()=>{
        getCmpDetails();
    }, [])

    return (
    <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
    <h2 className='pt-3'><strong><img src={buildings} style={{ width: '6.5%'}} /> Company Details</strong></h2>

        <div className='row'>
        <div className={`col my-4`}>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title align-right"><strong>Company Name: {cmpData.name}</strong></h5>
              <hr/>
              <h5 class="card-title"><strong>Company Email: {cmpData.emailId}</strong></h5>
              <hr/>
              <h5 class="card-title"><strong>Company Address: {cmpData.shopNum}, {cmpData.add2}, {cmpData.city}, {cmpData.state}, {cmpData.country}</strong></h5>
              </div>
          </div>
        </div>

          </div>
        </div>
  )
}

export default CmpDetail
