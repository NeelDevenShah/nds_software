import React from 'react'

function AddSalesModal() {
  return (
    <div class="modal fade" id="AddToSalesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Adding Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once It Been Added To The Sales Order, The Action Cannot Be Reverted From Here
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-secondary">Conform</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSalesModal
