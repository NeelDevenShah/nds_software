import React from 'react'
import {useState} from 'react'

function WarehousesDetails() {
  const ItemCategory = [
    {
      'cname': 'pen',
      'qty': '1200'
    },
    {
      'cname': 'pencil',
      'qty': '3000'
    },
    {
      'cname': 'Ruller',
      'qty': '2500'
    },
    {
      'cname': 'Rubber',
      'qty': '1200'
    },
    {
      'cname': 'Notebook',
      'qty': '550'
    },
    {
      'cname': 'Paper',
      'qty': '600'
    },
  ]
  const [newCategory, setCategory] = useState(ItemCategory)
  const ItemByCategory=[
    {
      'item': 'Black Pen',
      'qty': '5000'
    },
    {
      'item': 'Red Pen',
      'qty': '4000'
    },
    {
      'item': 'Blue Pen',
      'qty': '3500'
    },
    {
      'item': 'Pink Pen',
      'qty': '2000'
    },
  ]
  const [newItemList, setItemList] =useState(ItemByCategory)
  return (
    <div className='container bg-white py-3 my-4' style={{ borderRadius: '5px' }}>
      <h2 className='pt-3'><strong>Category Wise Stock</strong></h2>
      <div className='container'>
        <div className='row'>

        {newCategory.map((cat)=>{
          return  <div className={`col-md-4 my-4`}>
          <div class="card">
            <div class="card-body">
              <p class="card-text"><strong>{cat.cname}</strong></p>
              <hr />
              <div className='container'>
                {newItemList.map((list)=>{
                    return  <p>{list.item}: {list.qty} units</p>
                })}  
              </div>
            </div>
          </div>
        </div>
        })}

          {/* <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <p class="card-text"><strong>Pen</strong></p>
                <hr />
                <div className='container'>
                  <p>Black Pen(In Qty.): 50000</p>
                  <p>Blue Pen(In Qty.): 2500</p>
                  <p>Red Pen(In Qty.): 4300</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <p class="card-text"><strong>Pen</strong></p>
                <hr />
                <div className='container'>
                  <p>Black Pen(In Qty.): 50000</p>
                  <p>Blue Pen(In Qty.): 2500</p>
                  <p>Red Pen(In Qty.): 4300</p>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  )
}

export default WarehousesDetails