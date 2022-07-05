import React from 'react'
import DeleteSomeStock from './DeleteSomeStockModal'
import DeleteAllStockModal from './DeleteAllStockModal'

function DeleteStockModal() {
  return (
    <div>
        <DeleteSomeStock/>
        <DeleteAllStockModal/>
       <div class="modal fade" id="DeleteSModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Stock</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           Choose One Of The Following :
                           <button type="button" class="btn btn-secondary my-3" data-bs-toggle="modal" data-bs-target="#deleteSome">Delete Some Of Stock Of Selected Item</button>
                           <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#deleteAll">Delete All Stocks Of Selected Item</button>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-secondary">Conform</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default DeleteStockModal
