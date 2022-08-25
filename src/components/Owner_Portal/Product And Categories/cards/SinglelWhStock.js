import React, { useState } from 'react'
import {useEffect} from 'react'
import ProductsOfSingleWarehouse from './ProductsOfSingleWarehouse';
import Context from '../../../../Context';
import { useContext } from 'react';

function TotalWarehousesStock(props) {

  const context=useContext(Context);
  const {sdmoveId, setSdmoveId, sddeleteId, setSddeleteId, getproductDetails, prodByid}=context;
  const [address, setAddress] = useState([])
  //Function For Getting Warehouses
  const getwarehouse=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getwarehousesforcmp', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'cmp-token': localStorage.getItem('cmptoken')
      }
    })
    const json=await response.json();
    setAddress(json)
  }

  useEffect(()=>{
    getwarehouse();
  })

  return (
    <>
      {address.map((dataadd)=>{
        return <div className='container bg-white py-4  my-4' style={{ borderRadius: '5px' }}> 
        <h2 className='pt-3'><strong>Stock In {dataadd.wname}</strong></h2>
        {dataadd.shopNum!="Default"?<p>{dataadd.shopNum}, {dataadd.add2}, {dataadd.city}, {dataadd.state}</p>:<p>Default</p>}
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
                        </tr>
                    </thead>
                    <ProductsOfSingleWarehouse wareId={dataadd.warehouseId}/>
                </table>
            </div>
        </div>
    </div>
      })}
    </>
  )
}


export default TotalWarehousesStock