import React from 'react'

function AddCategoryModal() {
  return (
    <div class="modal fade" id="AddCatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Category</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter New Category Name:</label>
                            <input type="email" class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Unique Category Than That Exists' />
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-secondary">Add Category</button>
                      </div>
                    </div>
                  </div>
                </div>
  )
}

export default AddCategoryModal
