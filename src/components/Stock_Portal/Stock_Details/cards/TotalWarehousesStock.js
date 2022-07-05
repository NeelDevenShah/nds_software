import React, { useState } from 'react'

function TotalWarehousesStock() {
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
            <h2 className='py-3'><strong>Stock In Warehouses</strong></h2>
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
                               </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TotalWarehousesStock
