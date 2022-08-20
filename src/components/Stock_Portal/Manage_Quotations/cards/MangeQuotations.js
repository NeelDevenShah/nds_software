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
  const [categoryModal, setCategoryModal] = useState(ItemCat)
  //To get the data of category for the Add new product Modal
  const getCategoryData=async()=>{
    const response=await fetch('http://localhost:5000/api/getdata/getcategories', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const json=await response.json();
    setCategoryModal(json)
  }
  
const Item = []
const [productsOfCatModal, setProductsOfCatModalModal] = useState(Item)
const [apicategoryId, setapicategoryId]=useState(-1);
//apiProductId will be set directly by the onChange function of the select 
const [apiproductId, setapiproductId]=useState(-1);
//For the new product's modal's product according to the category and setting the final categoryId
const productbycategoryIdforModal=async(categoryId)=>{
  if(categoryId!=-1)
  {
    setapicategoryId(categoryId);  
    const response=await fetch(`http://localhost:5000/api/getdata//getproductofcategory`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'categoryId': categoryId
        },
      })
      const json=await response.json();
      setProductsOfCatModalModal(json);
    }
  }

  const [nqprodData, setNqprodData]=useState({nqpquantity:0, nqpPPP:0})
  //For adding the new product to the quotation
  const addnewproducttoquot=async(id)=>{
        console.log(id)
        let categoryName="", productName="";
        categoryModal.map((data)=>{
          if(data.categoryId==apicategoryId)
          {
            categoryName=data.pcname;
          }
        })
        productsOfCatModal.map((data)=>{
          if(data.productId==apiproductId)
          {
            productName=data.productName;
          }
        })
    const response=await fetch(`http://localhost:5000/api/quotation/addproduct/${id}`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({categoryId:apicategoryId, categoryName:categoryName, productId:apiproductId, productName:productName, quantity:nqprodData.nqpquantity, perPicePrice:nqprodData.nqpPPP})
      })
      const json=await response.json();
      if(json.success)
      {
        console.log("Product added successfully")
      }
      else{
        console.log(json)
        console.log("Product does not being added an error commed")
      }
  }

   //For the new product's quantity and ppp
   const onChange3=(event)=>{
    setNqprodData({...nqprodData, [event.target.name]: event.target.value})
   }

  // const expt=()=>{
  //   console.log(nqprodData.nqpquantity);
  //   console.log(nqprodData.nqpPPP);
  // }

  let QdelqId=0, i=1, newprodQid=0;
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
                                    <select id='selectCategory' class="form-select form-select-sm mb-3" aria-label=".form-select-lg example" onChange={async(event)=>{productbycategoryIdforModal(event.target.value)}}>
                                        <option selected value={-1}>Select</option>
                                        {/* Here we had saved the value in const, Instead we have to use the from json */}
                                        {categoryModal.map((cat) => {
                                            return <option value={cat.categoryId}>{cat.pcname}</option>
                                        })}
                                    </select>
                                </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Select The Product</label>
                                    {/* For taking the value from the database of the saved category use following method, where notes comes from the database, and instead it you can take anyt name */}

                                    <div class="dropdown">
                                        <select id='products' class="form-select form-select-sm mb-3" aria-label=".form-select-lg example" onChange={async(event)=>{setapiproductId(event.target.value)}}>
                                            <option selected value={-1}>Select</option>
                                            {/* Here we had saved the value in const, Instead we have to use the from json */}
                                            {productsOfCatModal.map((itm) => {
                                                return <option value={itm.productId}>{itm.productName}</option>
                                            })}
                                        </select>
                                    </div>
                                    </div>

                                    <label class="form-label">Enter Quantity Of Product</label>
                                    <input type="number" name= "nqpquantity" value={nqprodData.nqpquantity} onChange={onChange3} class="form-control text-center" id="Itemquty" required />
                                    {/* <input type="text" class="form-control text-center" id="comp" aria-describedby="emailHelp" name="compName" value={newqdata.compName} onChange={onChangeForNewQ} required /> */}

                                    <label class="form-label">Enter Per-Piece Price</label>
                                    <input type="number" name="nqpPPP" value={nqprodData.nqpPPP} onChange={onChange3} class="form-control text-center" id="Itemprice" required />
                            
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={()=>(addnewproducttoquot(newprodQid))} class="btn btn-secondary" data-bs-dismiss="modal">Add</button>
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
              <button type="button" onClick={newprodQid=QcmpDetail._id} class="btn" data-bs-toggle="modal" data-bs-target="#AddToQuotationModal"><img src={add_item_image} width='120'></img></button>
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
