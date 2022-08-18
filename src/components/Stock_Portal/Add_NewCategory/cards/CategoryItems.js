import React from 'react'
import { useState, useEffect } from 'react'
function CategoryItems(props) {
  const item=[]
    const [catitem, setCatitem]=useState(item);
    const {id}=props;
    const getItemData=async(id)=>{
      console.log("i")  
      const response=await fetch(`http://localhost:5000/api/getdata/getcategorywisestock/${id}`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        })
        const json=await response.json();
        console.log(json)
        setCatitem(json);
  }  

  useState(()=>{
    getItemData(id);
  })
  return(
    <div>
      {/* {getItemData('62fc0d425ba9fdcd6fd90f75')} */}
    {catitem.map((lis)=>{
        return <p key={lis._id}>{lis.productName}: {lis.quantity} units</p>
    })}   
    </div>
  )
}

export default CategoryItems