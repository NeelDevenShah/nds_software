import React, { useState } from 'react'
import plus from '../../../../images/stockPortal_images/plus.png'

import DeleteCategotyModal from './DeleteCategotyModal'
import AddCategoryModal from './AddCategoryModal'

function Sales_Activity() {
  const ItemCategory = [
    {
      // id: 1,
      'cname': 'pen',
      'qty': '1200'
    },
    {
      // id: 2,
      'cname': 'pencil',
      'qty': '3000'
    },
    {
      // id: 3,
      'cname': 'Ruller',
      'qty': '2500'
    },
    {
      // id: 4,
      'cname': 'Rubber',
      'qty': '1200'
    },
    {
      // id: 5,
      'cname': 'Notebook',
      'qty': '550'
    },
    {
      // id: 6,
      'cname': 'Paper',
      'qty': '600'
    },
  ]
  const [newCategory, setCategory] = useState(ItemCategory)
  return (
    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      <DeleteCategotyModal />
      <AddCategoryModal />
      <h2 className='pt-3'><strong>Stock Details According To Product Category</strong></h2>
      <div className='container'>
        <div className='row'>

          {newCategory.map((cat) => {
            return <div className={`col-md-4 my-4`}>
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title"><strong>{cat.cname}</strong></h4>
                  <p class="card-text">{cat.qty}</p>
                  <hr />
                  <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteCatModal">Delete</button>
                </div>
              </div>
            </div>
          })}

          <div className={`col-md-4 my-4`}>
            <div class="card">
              <div class="card-body">
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddCatModal"><img src={plus} width='55'></img><strong>Add New Category</strong></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sales_Activity