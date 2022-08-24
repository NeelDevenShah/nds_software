import React, { useState, useTransition } from 'react'

import shopping_cart from '../../../../images/stockPortal_images/shopping_cart.png'

function Dead_stock() {
  const deadSTockDetail=[
    {
      'card_name': 'Red BallPen',
      'quantity': '5000'
    },
    {
      'card_name': 'Blue BallPen',
      'quantity': '3000'
    },
    {
      'card_name': 'Black BallPen',
      'quantity': '3000'
    },
    {
      'card_name': 'Pink BallPen',
      'quantity': '300'
    },
  ]
  const [deadData, setDeadData]=useState(deadSTockDetail)
  return (
    <div className='container bg-white py-2  my-4' style={{ borderRadius: '5px' }}>
        <h2 className='pt-3'><strong>Dead Stock Products</strong></h2>
          <div className='row'>
        
        {deadData.map((data)=>{
          return <div className={`col-md-4 my-4`}>
          <div class="card">
            <div class="card-body">
              <h2 class="card-title"><strong>{data.card_name}</strong></h2>
              <h6 class="card-subtitle mb-2 text-muted"><img src={shopping_cart} style={{ width: '6.5%' }} />{data.quantity} Units</h6>
            </div>
          </div>
        </div>
        })}

          </div>
        </div>
  )
}

export default Dead_stock
