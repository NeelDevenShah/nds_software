import React from 'react'

import {useState} from 'react'

function AddQModal() {
    const [note, setNote] = useState({ compName: "", giveQty: "" })
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }
    return (
        <div class="modal fade" id="AddQuotationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Quotataion</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                            <label class="form-label">Enter Quotation Number</label>
                                <input type="number" class="form-control text-center" id="comp" aria-describedby="emailHelp" name="compName" onChange={onChange} required />
                                <label class="form-label">Enter The Name Of Company To Whom Quotation Is To Be Given</label>
                                <input type="text" class="form-control text-center" id="comp" aria-describedby="emailHelp" name="compName" onChange={onChange} required />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-secondary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddQModal
