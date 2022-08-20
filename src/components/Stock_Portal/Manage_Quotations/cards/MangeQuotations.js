import React, { useState, useEffect} from 'react'

import plus from '../../../../images/stockPortal_images/plus.png'
import add_item_image from '../../../../images/stockPortal_images/add_item_image.png'
import GetQuotationProducts from './GetQuotationProducts'
import Context from '../../../../Context'
import {useContext} from 'react'

function ManageQuotations() {

  const context=useContext(Context);
  const {delprodId, editquantity, setEditquantity, editppp, seteditppp, quotNum, seteditQuotNum}=context;

  //At the loading of the page this would run first
  useEffect(()=>{
    getQData();
  }, [])

  const qarr=[];
  const [Qdata, setcmpQdata]=useState(qarr);
  //For getting the data of the quotation
  const getQData=async()=>{
    const response=await fetch(`http://localhost:5000/api/getdata/getquotations`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      })
      const json=await response.json();
      setcmpQdata(json);
  }  

  const [nqprodData, setNqprodData]=useState({categoryId:"", categoryName:"", productId:"", productName:"", quantity:"", perPicePrice:""})
  //For adding the new product to the quotation
  // const addnewproducttoquot=async()=>{
  //   const response=await fetch(`http://localhost:5000/api/getdata/getquotationproducts`, {
  //       method: 'POST',
  //       headers:{
  //         'Content-Type': 'application/json',
  //         'auth-token': localStorage.getItem('token')
  //       },
  //       body: JSON.stringify({categoryId:nqprodData.categoryId, categoryName:nqprodData.categoryName, productId:nqprodData.productId, productName:nqprodData.productName, quantity:nqprodData.quantity, perPicePrice:nqprodData.perPicePrice})
  //     })
  //     const json=await response.json();
  //     if(json.success)
  //     {
  //       console.log("Product added successfully")
  //     }
  //     else{
  //       console.log("Product does not being added an error commed")
  //     }
  // }

  const [newqdata, setNewqdata]=useState({quotationNum:"", dealer:""})
  //For adding the new quotation
  const addquotation=async()=>{
    const response=await fetch(`http://localhost:5000/api/quotation/addquotation`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({quotationNum: newqdata.quotationNum, dealer: newqdata.compName, totalAmount:0})
      })
      const json=await response.json();
      if(json.success)
      {
        console.log("new quotation added successfull")
        getQData();
      }
      else{
        console.log("error comming"+json);
      }   
  }
  const onChangeForNewQ=(event)=>{
    setNewqdata({...newqdata, [event.target.name]: event.target.value})
  }

  //For deleting the quotation
  const makedeletedquotation=async(id)=>{
    const response=await fetch(`http://localhost:5000/api/quotation/deletequotation/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    if(json.success)
    {
      console.log("Quotation Deleted Successfull");
      getQData();
    }
    else{
      console.log("Quotation does not deleted, error")
    }
  }

  let ItemCat=[];
  const [newCategory, setCategory] = useState(ItemCat)
  //To get the data of category
  const getCategoryData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getcategories', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    setCategory(json)
  }

const Item = [
    {
        id: 1,
        'item': 'Blue Pen',
    },
    {
        id: 2,
        'item': 'Black Pen',
    },
    {
        id: 3,
        'item': 'Red PEn',
    }
]
const [newItem, setItem] = useState(Item)
const [nqprodyct, Setnqprodyct] = useState()
const onChange = (event) => {
    Setnqprodyct({ ...nqprodyct, [event.tatget.name]: [event.tatget.value] })
}
  //
  let QdelqId=0, i=1;
  return (

    <div className='container bg-white py-3' style={{ borderRadius: '5px' }}>
      {/* AddSalesModal */}
      <div class="modal fade" id="AddToSalesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Adding Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once It Been Added To The Sales Order, The Action Cannot Be Reverted From Here
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* Delete Quotation Modal */}
      <div class="modal fade" id="DeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Once It Is Been Deleted, It Cannot Be Recovered
          </div>
          <div class="modal-footer">
            <button type="button" onClick={QdelqId=0} class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={()=>{makedeletedquotation(QdelqId)}} class="btn btn-secondary" data-bs-dismiss="modal">Conform</button>
          </div>
        </div>
      </div>
    </div>
      {/*  */}
      {/* Add New Item/Product Modal */}
      <div class="modal fade" id="AddToQuotationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    {useState(()=>{
                          getCategoryData();
                    }, [])}
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Select The Product Category</label>
                                <div class="dropdown">
                                    <select class="form-select form-select-sm mb-3" aria-label=".form-select-lg example">
                                        <option selected>Select</option>
                                        {/* Here we had saved the value in const, Instead we have to use the from json */}
                                        {newCategory.map((cat) => {
                                            return <option value={cat.categoryId}>{cat.pcname}</option>
                                        })}
                                    </select>
                                    {/* {console.log(selected.value)} */}
                                </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Select The Product</label>
                                    {/* For taking the value from the database of the saved category use following method, where notes comes from the database, and instead it you can take anyt name */}

                                    <div class="dropdown">
                                        <select class="form-select form-select-sm mb-3" aria-label=".form-select-lg example">
                                            <option selected>Select</option>
                                            {/* Here we had saved the value in const, Instead we have to use the from json */}
                                            {newItem.map((itm) => {
                                                return <option value={itm.category}>{itm.item}</option>
                                            })}
                                        </select>
                                    </div>
                                    </div>

                                    <label class="form-label">Enter Quantity Of Product</label>
                                    <input type="number" class="form-control text-center" id="Itemquty" name="ItemQuantity" onChange={onChange} required />
                                    
                                    <label class="form-label">Enter Per-Piece Price</label>
                                    <input type="number" class="form-control text-center" id="Itemprice" name="ItemPrice" onChange={onChange} required />
                            
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-secondary">Add</button>
                    </div>
                </div>
            </div>
        </div>

      {/*  */}
      {/* AddQuotation Modal */}
      <div class="modal fade" id="AddQuotationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Quotataion</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                            <label class="form-label">Enter An Unique Quotation Id</label>
                                <input type="number" class="form-control text-center" id="comp" aria-describedby="emailHelp" name="quotationNum" value={newqdata.quotationNum} onChange={onChangeForNewQ} required />
                                <label class="form-label">Enter The Name Of Company To Whom Quotation Is To Be Given</label>
                                <input type="text" class="form-control text-center" id="comp" aria-describedby="emailHelp" name="compName" value={newqdata.compName} onChange={onChangeForNewQ} required />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>{addquotation()}} class="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
      {/*  */}

      <h2 className='pt-3'><strong>Your Given Quotations</strong></h2>
      <div className='row d-flex justify-content-center'>

        {Qdata.map((QcmpDetail)=>{
          return  <div key={QcmpDetail._id} className={`col-md-6 my-4`}>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title"><strong>Quotation #{i++}</strong></h4>
              <p class="card-text"><strong>Dealer: {QcmpDetail.dealer}, QuotationId: {QcmpDetail.quotationNum}</strong></p>
              <div className='table-responsive'>
              <table class="table table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Product Category</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity No.'s</th>
                    <th scope="col">Per-Piece(<span>&#8377;</span>)</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <GetQuotationProducts key={QcmpDetail._id+1} quotationNum={QcmpDetail.quotationNum} getQData={getQData}/>
              </table>
              </div>
              <p>Total Quotation Amount: <strong>{QcmpDetail.totalAmount}</strong></p>
              <hr/>
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddToQuotationModal"><img src={add_item_image} width='120'></img></button>
              <hr />
              <button type="button" class="btn btn-success mx-2" data-bs-toggle="modal" data-bs-target="#AddToSalesModal">Add To Sales Order</button>
              <button type="button" onClick={QdelqId=QcmpDetail._id} class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeleteModal">Delete</button>
              {/* <!-- Button trigger modal --> */}
            </div>
          </div>
        </div>
        })}

        <div className={`col-md-5 my-4`}>
          <div class="card">
            <div class="card-body">
              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AddQuotationModal"><img src={plus} width='55'></img><strong> Add New Quotation</strong></button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageQuotations
