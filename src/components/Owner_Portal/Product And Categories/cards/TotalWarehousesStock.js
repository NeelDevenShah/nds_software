import React, { useEffect, useState } from 'react'

function TotalWarehousesStock() {
    let i=1;
    const data=[];
    const [whsdata, setWhsdata]=useState(data)

    //Function For Getting Details Of All Producrs Present In Warehouses
    const getproductInWareDetails=async()=>{
        const response=await fetch('http://localhost:5000/api/getdata/getallstockproductsofcompany', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json=await response.json();
        setWhsdata(json);
    }

    useEffect(()=>{
        getproductInWareDetails();
    }, [])

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
                                 <td>{data.productName}</td>
                                 <td>{data.productcategory}</td>
                                 <td>{data.quantity}</td>
                                 <td>{data.demand}</td>
                                 <td>{data.predictedDemand}</td>
                                 <td>{data.inWarehouses}</td>
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
