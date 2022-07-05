import React, { useState } from 'react'

function EditSalesModal() {
    const [note, setNote] = useState()
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: [event.target.value] })
    }
    return (
        <div class="modal fade" id="EditSalesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Sales Order Product</h5>
                    </div>
                    <div class="modal-body">
                        Edit The Thing You Want To Change, Otherwise Not Make Change In It, The Change Can Only Be Made In The Quantity And Per-Piece Price 
                        <hr/>
                        <form>
                            {/* The system would be maked that the information would be shown and some of them would be permited to change */}
                        <label class="form-label">Product Name</label>
                            <input type="number" class="form-control text-center" id="Itemquty" name="ItemQuantity" onChange={onChange} required />

                            <label class="form-label">Product Category</label>
                            <input type="number" class="form-control text-center" id="Itemquty" name="ItemQuantity" onChange={onChange} required />

                            <label class="form-label">Quantity Of Product</label>
                            <input type="number" class="form-control text-center" id="Itemquty" name="ItemQuantity" onChange={onChange} required />

                            <label class="form-label">Per-Piece Price</label>
                            <input type="number" class="form-control text-center" id="Itemprice" name="ItemPrice" onChange={onChange} required />

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-secondary">Change</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditSalesModal
