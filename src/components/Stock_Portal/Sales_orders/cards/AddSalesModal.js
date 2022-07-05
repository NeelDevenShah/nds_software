import React from 'react'

import { useState } from 'react'

function AddSalesModal() {
    const paymentTerms = [
        {
            'term': 'Hour',
        },
        {
            'term': 'Day',
        },
        {
            'term': 'Week',
        },
        {
            'term': 'Month',
        },
        {
            'term': 'Year',
        }
    ]
    const Item = [
        {
            id: 1,
            'item': 'Blue Pen',
        },
        {
            id: 2,
            'item': 'Black Pen',
        },
        {
            id: 3,
            'item': 'Red PEn',
        }
    ]
    const [newPay, setNewPay] = useState(paymentTerms)
    const [newItem, setItem] = useState(Item)
    const [note, setNote] = useState({ compName: "", giveQty: "" })
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }
    return (
        <div class="modal fade" id="AddSalesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Sales Order</h5>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Enter The Buyer Company's Name</label>
                                <input type="text" class="form-control text-center" id="comp" aria-describedby="emailHelp" name="compName" onChange={onChange} required />

                                <label class="form-label">Enter The Broker Name</label>
                                <input type="text" class="form-control text-center" id="comp" aria-describedby="emailHelp" name="compName" onChange={onChange} required />

                                <div class="form-floating my-2">
                                    <input type="textarea" class="form-control" placeholder="Leave a comment here" id="floatingTextarea" required />
                                    <label for="floatingTextarea">Comments</label>
                                </div>

                                <label class="form-label">Enter The Payment Terms</label>
                                <div class="payMe d-flex justify-content-center">
                                    <input type="number" class="form-control text-center" style={{width: '85px', height: '32px'}} id="comp" aria-describedby="emailHelp" name="compName" onChange={onChange} placeholder='Digits' required />
                                    
                                    <select class="form-select form-select-sm mb-3 w-50 mx-4" aria-label=".form-select-lg example">
                                        <option selected>Select</option>
                                        {/* Here we had saved the value in const, Instead we have to use the from json */}
                                        {newPay.map((ter) => {
                                            return <option value={ter.term}>{ter.term}</option>
                                        })}
                                    </select>

                                </div>

                                <label class="form-label">Enter Date Of Commited Order Dispatch</label>
                                <div class="payMe d-flex justify-content-center">
                                    <input type="text" class="form-control text-center" style={{width: '44px', height: '32px'}} id="comp" aria-describedby="emailHelp" name="compName" onChange={onChange} placeholder='dd' maxLength={2} required />
                                    <input type="text" class="form-control text-center mx-1" style={{width: '44px', height: '32px'}} id="comp" aria-describedby="emailHelp" name="compName" onChange={onChange} placeholder='mm' maxLength={2} required />
                                    <input type="text" class="form-control text-center" style={{width: '66px', height: '32px'}} id="comp" aria-describedby="emailHelp" name="compName" onChange={onChange} placeholder='yyyy' maxLength={4} required />
                                </div>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-secondary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSalesModal
