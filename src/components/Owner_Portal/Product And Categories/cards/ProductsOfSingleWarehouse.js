import React, {useState, useContext, useEffect} from 'react'
import Context from '../../../../Context';

function ProductsOfSingleWarehouse(props) {
    
    let i=1;
    const context=useContext(Context);
    const {sdmoveId, setSdmoveId, sddeleteId, setSddeleteId, getproductDetails, prodByid}=context;

    const stDetails = [];
    const [sData, setSData]=useState(stDetails)
    
      //Function For getting the stock of the warehouse by warehouse id
      const getstockbywareId=async()=>{
        const response=await fetch(`http://localhost:5000/api/getdata/getproductsofwarehouseforcmp/${props.wareId}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'cmp-token': localStorage.getItem('cmptoken')
            }
        })
        const json=await response.json();
        setSData(json);
      }

    useState(()=>{
        getstockbywareId();
    })
    return (
    <tbody>
        {sData.map((stockData)=>{
        return <tr>
            <th scope="row">{i++}</th>
            <td>{stockData.productName}</td>
            <td>{stockData.productcategory}</td>
            <td>{stockData.quantity}</td>
            <td>{stockData.demand}</td>
            <td>{stockData.predictedDemand}</td>
            </tr>
        })}
    </tbody>
  )
}

export default ProductsOfSingleWarehouse
