import React from 'react'

function MoveStockModal() {
    const onSubmit=(event)=>{
        event.preventDefault();
        console.log("Checking");
    }
    return (
        <div class="modal fade" id="MoveSModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Move Stock</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Once The Stock Is Been Moved, It Cannot Be Reverted Back, So Make The Changes Carefully
                        <hr />
                        At The Current Time The Stock Of the "Item-name" Present Is "5000", Make Sure You Transfer The Less Amount Or The Amount Equal To It
                        <hr />
                        <form onSubmit={onSubmit}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Select The Warehouse, Where You Want To Transfer The Stock Of The Item</label>
                                <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                    <option selected>Select Here</option>
                                    <option value="1">Warehouse 1</option>
                                    <option value="2">Warehouse 2</option>
                                    <option value="3">Warehouse 3</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label  class="form-label">Enter The Amount Of Item You Want To Transfer</label>
                                <input type="number" class="form-control" id="stockAmount" />
                            </div>
                            <hr />
                            <button type="button" class="btn btn-secondary mx-3" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-secondary">Conform</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoveStockModal
