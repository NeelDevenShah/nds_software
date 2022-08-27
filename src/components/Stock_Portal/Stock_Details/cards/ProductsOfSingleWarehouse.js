import React, {useState, useContext, useEffect} from 'react'
import Context from '../../../../Context';

function ProductsOfSingleWarehouse(props) {
    
    let i=1;
    const context=useContext(Context);
    const {sdmoveId, setSdmoveId, sddeleteId, setSddeleteId, getproductDetails, prodByid}=context;
    
      //Function For getting the stock of the warehouse by warehouse id
      const [sData, setSData]=useState([])
      const [noData, setnoData]=useState("no");
      const getstockbywareId=async()=>{
        const response=await fetch(`http://localhost:5000/api/getdata/getproductsofwarehouse/${props.wareId}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json=await response.json();
        setSData(json);
        if(json.length==0)
        {
        setnoData("yes");
        }
      }

      const handleDeleteButton=(id)=>{
        getproductDetails(id);
        setSddeleteId(id);
      }

    useState(()=>{
        getstockbywareId();
    })
    return (
    <tbody>
        {noData=="yes"?<><p><strong>No Products Exists, Add To View</strong></p></>:sData.map((stockData)=>{
        return <tr>
            <th scope="row">{i++}</th>
            <td>{stockData.productName}</td>
            <td>{stockData.productcategory}</td>
            <td>{stockData.quantity}</td>
            <td>{stockData.demand}</td>
            <td>{stockData.predictedDemand}</td>
            <td><button type="button" onClick={()=>{getproductDetails(stockData._id)}} className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#MoveSModel">Move</button></td>
            <td><button type="button" onClick={()=>{handleDeleteButton(stockData._id)}} className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#DeleteSModel">Delete</button></td>
            </tr>
        })}
    </tbody>
  )
}

export default ProductsOfSingleWarehouse
