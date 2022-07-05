import React from 'react'

function ArrivedOrderModal() {
  return (
    <div class="modal fade" id="ArrivedOrderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Conform Notification</h5>
          </div>
          <div class="modal-body">
            Once It Is Been Arrived, It Cannot Be Recovered, And The Stock Related All The Things Would Be Done Automatically
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

export default ArrivedOrderModal
