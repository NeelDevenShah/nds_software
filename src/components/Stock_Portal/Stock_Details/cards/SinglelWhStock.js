import React, { useState } from 'react'

import WarehousesChartProcessor from '../../../ChartProcessors/Stock_portal/stockDetails/WhStockProcessor'
import MoveStockModal from './MoveStockModal'
import DeleteStockModal from './DeleteStockModal'

function TotalWarehousesStock(props) {
  let i = 1;
  let j=1;
  const firstComeHere=()=>{
    j=1;
  }
  const warehouseDetails = [
    {
      'waddress': 'A1 punkal Estate, Ahmedabad'
    },
    {
      'waddress': 'A1 Ghanshyam Estate, Ahmedabad'
    },
    {
      'waddress': 'A1 Ample Estate, Ahmedabad'
    },
  ]
  const [address, setAddress] = useState(warehouseDetails)
  const stDetails = [
    {
      'product_name': 'Blue Ball Pen',
      'product_material': 'PP PLastic',
      'product_category': 'Pens',
      'quantity': '30000',
      'demand_status': 'Regular',
      'predicted_demand': '31000',
    },
    {
      'product_name': 'Blue Ball Pen',
      'product_material': 'PP PLastic',
      'product_category': 'Pens',
      'quantity': '30000',
      'demand_status': 'Regular',
      'predicted_demand': '31000',
    },
    {
      'product_name': 'Blue Ball Pen',
      'product_material': 'PP PLastic',
      'product_category': 'Pens',
      'quantity': '30000',
      'demand_status': 'Regular',
      'predicted_demand': '31000',
    },
    {
      'product_name': 'Blue Ball Pen',
      'product_material': 'PP PLastic',
      'product_category': 'Pens',
      'quantity': '30000',
      'demand_status': 'Regular',
      'predicted_demand': '31000',
    },
    {
      'product_name': 'Blue Ball Pen',
      'product_material': 'PP PLastic',
      'product_category': 'Pens',
      'quantity': '30000',
      'demand_status': 'Regular',
      'predicted_demand': '31000',
    },
  ]
  const [sData, setSData]=useState(stDetails)
  return (
    <>
      <MoveStockModal />
      <DeleteStockModal />
      {address.map((dataadd)=>{
        return <div className='container bg-white py-4  my-4' style={{ borderRadius: '5px' }}> 
        <h2 className='pt-3'><strong>Stock In Warehouse {i++}</strong></h2>
        <p>{dataadd.waddress}</p>
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
                            <th scope="col">Move</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                      {firstComeHere()}
                      {sData.map((stockData)=>{
                     return <tr>
                        <th scope="row">{j++}</th>
                        <td>{stockData.product_name}</td>
                        <td>{stockData.product_material}</td>
                        <td>{stockData.product_category}</td>
                        <td>{stockData.quantity}</td>
                        <td>{stockData.demand_status}</td>
                        <td>{stockData.predicted_demand}</td>
                        <td><button type="button" className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#MoveSModel">Move</button></td>
                        <td><button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#DeleteSModel">Delete</button></td>
                      </tr>
                      })}
                        </tbody>
                </table>
            </div>
        </div>
        <div className='container'>
        <div className='row d-flex justify-content-center'>
        <WarehousesChartProcessor/>
        </div>
        </div>
    </div>
      })}
    </>
  )
}


export default TotalWarehousesStock