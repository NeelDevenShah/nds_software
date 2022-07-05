import React from 'react'
import { useState } from 'react'

function AddItemModal() {
    const ItemCategory = [
        {
            id: 1,
            'category': 'Pen',
        },
        {
            id: 2,
            'category': 'Pencil',
        },
        {
            id: 3,
            'category': 'Eraser',
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
    const [newCategory, setCategory] = useState(ItemCategory)
    const [newItem, setItem] = useState(Item)
    const [note, setNote] = useState()
    const onChange = (event) => {
        setNote({ ...note, [event.tatget.name]: [event.tatget.value] })
    }
    return (
        <div class="modal fade" id="AddProductToSales" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Product To Order</h5>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Select The Product Category</label>
                                
                                <div class="dropdown">
                                    <select class="form-select form-select-sm mb-3" aria-label=".form-select-lg example">
                                        <option selected>Select</option>
                                        {/* Here we had saved the value in const, Instead we have to use the from json */}
                                        {newCategory.map((cat) => {
                                            return <option value={cat.category}>{cat.category}</option>
                                        })}
                                    </select>
                                </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Select The Product</label>
                                    {/* For taking the value from the database of the saved category use following method, where notes comes from the database, and instead it you can take anyt name */}

                                    <div class="dropdown">
                                        <select class="form-select form-select-sm mb-3" aria-label=".form-select-lg example">
                                            <option selected>Select</option>
                                            {/* Here we had saved the value in const, Instead we have to use the from json */}
                                            {newItem.map((itm) => {
                                                return <option value={itm.category}>{itm.item}</option>
                                            })}
                                        </select>
                                    </div>
                                    </div>

                                    <label class="form-label">Enter Quantity Of Product</label>
                                    <input type="number" class="form-control text-center" id="Itemquty" name="ItemQuantity" onChange={onChange} required />
                                    
                                    <label class="form-label">Enter Per-Piece Price</label>
                                    <input type="number" class="form-control text-center" id="Itemprice" name="ItemPrice" onChange={onChange} required />
                            
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

export default AddItemModal
