import React from 'react'

function DeleteAllStockModal() {
    return (
        <div class="modal fade" id="deleteAll" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete All Stock Conformation</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    Once You Delete The Stock, Stock Can Not Come Back And The Data Will Be Deleted For-Ever
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

export default DeleteAllStockModal
