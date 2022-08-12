import React from 'react'
import { useState } from 'react'

function ManageStatusModal() {
    const [note, setNote] = useState();
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: [event.target.value] })
    }
    const statusData = [
        {
            'id': '1',
            'status': 'To Be Planned'
        },
        {
            'id': '2',
            'status': 'To Be Ordered/Produced'
        },
        {
            'id': '3',
            'status': 'To Be Packed'
        },
        {
            'id': '2',
            'status': 'To Be Shiped'
        },
    ]
    const [getStatus, setStatus] = useState(statusData);
    const wareHouseData = [
        {
            'id': '1',
            'warehouse': 'w1',
            'quantity': '5000'
        },
        {
            'id': '1',
            'warehouse': 'w2',
            'quantity': '3000'
        },
        {
            'id': '1',
            'warehouse': 'w3',
            'quantity': '2500'
        },
    ]
    const [getwhdata, setwhdata] = useState(wareHouseData);
    return (
        <div class="modal fade" id="ManageStatusModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Manage Status Of Order #334</h5>
                    </div>
                    <div class="modal-body">
                        Edit The Thing You Want To Change, Otherwise Not Make Change In It
                        <hr />
                        <form>
                            {/* The system would be maked that the information would be shown and some of them would be permited to change */}

                            <strong><label class="form-label">Product Name: "Product Name Here:"</label></strong>
                            <strong><label class="form-label">Product Category: "Product Categoty Here"</label></strong>
                            <strong><label class="form-label">Total Product Sales Quantity: "Quantity Here"</label></strong>
                            <hr/>
                            <label class="form-label mt-1">Select The Product Status</label>
                            <div class="dropdown">
                                <select class="form-select form-select-sm mb-3" aria-label=".form-select-lg example">
                                    <option selected>Select</option>
                                    {/* Here we had saved the value in const, Instead we have to use the from json */}
                                    {getStatus.map((itm) => {
                                        return <option value={itm.status}>{itm.status}</option>
                                    })}
                                </select>
                            </div>

                            <label class="form-label mt-1">Select From Which Warehouse The Stock Is To Be Dispatched(If More Than One, Than Select More Than One)</label>
                            <hr />
                            {getwhdata.map((choice) => {
                                return <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value={`option${choice.id}`} />
                                    <label class="form-check-label" for="inlineCheckbox3">{choice.warehouse} | Quantity Of Item Present :{choice.quantity} | Dis. Qty. <input type="number" style={{height: '15px', width: '95px'}} class="form-control text-center" id="Itemprice" name="ItemPrice" onChange={onChange} required /> </label>
                                </div>


                            })}

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

export default ManageStatusModal
