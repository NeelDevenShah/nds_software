import React from 'react'

function DeleteSomeStock() {
    const onSubmit=(event)=>{
        event.preventDefault();
        // Check here that the amount entered here should be always less than that of the present amount or equal to the present amount and than send API request
    }
    return (
        <div class="modal fade" id="deleteSome" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete Some Stock Conformation</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        For Deleting Some Of The Stock Of "selected Item" From "warehouse-number", Enter The Amount You Want To Delete, The Present Amount Of The Item Is: "5000"
                        <hr/>
                        <form onSubmit={onSubmit}>
                        <div class="mb-3">
                            <label class="form-label"><strong>Enter The Quantity You Want To Delete & Make Sure The Quantity Is Lower Than The Stock Present</strong></label>
                            <input type="number" class="form-control" id="exampleInputPassword1"/>
                        </div>
                        <button type="button" class="btn btn-secondary mx-3" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-secondary">Conform</button>
                    </form>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default DeleteSomeStock
