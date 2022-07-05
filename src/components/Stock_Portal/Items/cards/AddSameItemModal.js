import React, { useState } from 'react'

function AddSameItemModal() {
    const [note, setNote]=useState();
    const onChange=(event)=>{
        setNote({...note, [event.target.name]:[event.target.value]})
    }
    const wareData=[
        {
            'name': 'warehouse 1',
        },
        {
            'name': 'warehouse 2',
        },
        {
            'name': 'warehouse 3',
        }
    ]
    const [wData, setWData]=useState(wareData)
    return (
    <div class="modal fade" id="AddSameItemModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="mb-3">
                                    <label class="form-label">Select The Warehouse Where You Want To Add The Product</label>
                                    <div class="dropdown">
                                        <select class="form-select form-select-sm mb-3" aria-label=".form-select-lg example">
                                            <option selected>Select</option>
                                            {/* Here we had saved the value in const, Instead we have to use the from json */}
                                            {wData.map((data) => {
                                                return <option value={data.name}>{data.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            <div class="mb-3">
                                <label class="form-label">Enter The Quantity You Want To Add</label>
                                <input type="number" class="form-control text-center" id="newItem" name="newItem" onChange={onChange} required />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-secondary">Add</button>
                    </div>
                </div>
            </div>
        </div>

  )
}

export default AddSameItemModal
