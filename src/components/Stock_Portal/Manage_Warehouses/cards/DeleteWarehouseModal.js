import React from 'react'

function e() {
  return (
    <div class="modal fade" id="DeleteWareModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Warehouse Delete Conformation Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once The Warehouse Is Deleted Than All The Stock Will BE Move To The Default Warehouse And The Stock Should Be Rearanged To Another Warehouse, And This Warehouse Will Not BE Available Any More
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

export default e
