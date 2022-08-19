import React from 'react'
import { useState, useEffect } from 'react'
function CategoryItems(props) {
  //Dummy method for getting the product according to the category by help of the id
  const item=[]
    const [catitem, setCatitem]=useState(item);
    const {id}=props;
    const getItemData=async(id)=>{
      const response=await fetch(`http://localhost:5000/api/getdata/getcategorywisestock/${id}`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        })
        const json=await response.json();
        setCatitem(json);
  }  

  useState(()=>{
    getItemData(id);
  })
  return(
    <div>
    {catitem.map((lis)=>{
        return <p key={lis._id}>{lis.productName}: {lis.quantity} units</p>
    })}   
    </div>
  )
}

export default CategoryItems