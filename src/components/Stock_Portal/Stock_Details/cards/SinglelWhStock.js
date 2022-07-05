import React from 'react'

import WarehousesChartProcessor from '../../../ChartProcessors/Stock_portal/stockDetails/WhStockProcessor'

function TotalWarehousesStock(props) {
    return (
        <div className='container bg-white py-4  my-4' style={{ borderRadius: '5px' }}>
            
            {/* <!-- Modal --> Do make different for both the purposes*/}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

            <h2 className='py-3'><strong>Stock In Warehouses {props.wnumber}</strong></h2>
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
                                <th scope="col">Move</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Blue Ball Pen</td>
                                <td>PP PLastic</td>
                                <td>Pens</td>
                                <td>30,000</td>
                                <td>Regular</td>
                                <td>31,000</td>
                                <td>3</td>
                                <td><button type="button" className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#exampleModal">Move</button></td>
                                <td><button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button></td>
                                {/* <!-- Button trigger modal --> */}
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Blue Ball Pen</td>
                                <td>PP PLastic</td>
                                <td>Pens</td>
                                <td>30,000</td>
                                <td>Regular</td>
                                <td>31,000</td>
                                <td>3</td>
                                <td><button type="button" className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#exampleModal">Move</button></td>
                                <td><button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button></td>
                            </tr>

                            <tr>
                                <th scope="row">3</th>
                                <td>Blue Ball Pen</td>
                                <td>PP PLastic</td>
                                <td>Pens</td>
                                <td>30,000</td>
                                <td>Regular</td>
                                <td>31,000</td>
                                <td>3</td>
                                <td><button type="button" className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#exampleModal">Move</button></td>
                                <td><button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button></td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Blue Ball Pen</td>
                                <td>PP PLastic</td>
                                <td>Pens</td>
                                <td>30,000</td>
                                <td>Regular</td>
                                <td>31,000</td>
                                <td>3</td>
                                <td><button type="button" className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#exampleModal">Move</button></td>
                                <td><button type="button" className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button></td>
                            </tr>
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
    )
}

export default TotalWarehousesStock
