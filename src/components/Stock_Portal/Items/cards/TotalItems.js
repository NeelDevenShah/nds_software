import React, { useState } from 'react'
import add_item_image from '../../../../images/stockPortal_images/add_item_image.png'
import plus from '../../../../images/stockPortal_images/plus.png'
import cancel from '../../../../images/stockPortal_images/cancel.png'
import minus from '../../../../images/stockPortal_images/minus.png'


function TotalItems() {
    let i=1;
    const TWHData=[
        {
            'Product_Name': 'Blue Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
        {
            'Product_Name': 'Back Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
        {
            'Product_Name': 'Blue Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
        {
            'Product_Name': 'Blue Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
        {
            'Product_Name': 'Blue Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
        {
            'Product_Name': 'Blue Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
        {
            'Product_Name': 'Blue Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
        {
            'Product_Name': 'Blue Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
        {
            'Product_Name': 'Blue Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
        {
            'Product_Name': 'Blue Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
        {
            'Product_Name': 'Blue Ball Pen',
            'Product_matrerial': 'PP Plastic',
            'Product_category': 'Pens',
            'Product_qty': '5050',
            'Product_demandstatus': 'Regular',
            'Product_predictedDemand': '12000',
            'Product_whs': '3',
        },
    ]
    const [whsdata, setWhsdata]=useState(TWHData)
    return (
        <div className='container bg-white py-4  my-4' style={{ borderRadius: '5px' }}>
            <h2 className='py-3'><strong>Total Products</strong></h2>
            <div className='row'>

                <div className='table-responsive'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope="col">Sr. No.</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Material</th>
                                <th scope="col">Product Category</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Demand Status</th>
                                <th scope="col">Predicted Demand(Next Month)</th>
                                <th scope="col">In warehouses</th>
                                <th scope="col">Add More</th>
                                <th scope="col">Delete Some</th>
                                <th scope="col">Delete Product</th>
                            </tr>
                        </thead>
                        <tbody>
                            {whsdata.map((data)=>{
                                return <tr>
                                 <th scope="row">{i++}</th>
                                 <td>{data.Product_Name}</td>
                                 <td>{data.Product_matrerial}</td>
                                 <td>{data.Product_category}</td>
                                 <td>{data.Product_qty}</td>
                                 <td>{data.Product_demandstatus}</td>
                                 <td>{data.Product_predictedDemand}</td>
                                 <td>{data.Product_whs}</td>
                                 <td><button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddSameItemModal"><img src={plus} width='25'></img></button></td>
                                 <td><button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#MinusSameItemModal"><img src={minus} width='25'></img></button></td>
                                 <td><button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#DeleteItemModal"><img src={cancel} width='25'></img></button></td>
                               </tr>
                            })}
                        </tbody>
                    </table>
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddItemModal"><img src={add_item_image} width='140'></img></button>
                </div>
            </div>
        </div>
    )
}

export default TotalItems
