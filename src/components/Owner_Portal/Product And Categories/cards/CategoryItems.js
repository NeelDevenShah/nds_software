import React from 'react'
import { useState, useEffect } from 'react'
function CategoryItems(props) {
  //Dummy Method For Getting Product According To Category By Help Of Id
    const [catitem, setCatitem]=useState([]);
    const [noData, setnoData]=useState("no");
    const {id}=props;
    const getItemData=async(id)=>{
      const response=await fetch(`http://localhost:5000/api/getdata/getcategorywisestockforcmp/${id}`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'cmp-token': localStorage.getItem('cmptoken')
          },
        })
        const json=await response.json();
        setCatitem(json);
        if(json.length==0)
      {
        setnoData("yes");
      }
  }  

  useState(()=>{
    getItemData(id);
  })

  return(
    <div>
    {noData=="yes"?<><p><strong>No Products Exists In This Category</strong></p></>:catitem.map((lis)=>{
        return <p key={lis._id}>{lis.productName}: {lis.quantity} units</p>
    })}   
    </div>
  )
}

export default CategoryItems